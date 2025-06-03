from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.models.db_recipes import Recipe, SimilarRecipe, RecipeIngredient
from app.schemas.recipe import RecipeSchema, SimilarRecipesSchema, RecipesWithSimilarSchema
from app.db.database import get_db
from dotenv import load_dotenv
import os, requests
from typing import Optional, List

# Import environment variables
load_dotenv()

router = APIRouter(
    prefix="/recipes",
    tags=["Recipes"],
    responses={
        404: {"description": "Recipe not found"},
        500: {"description": "Internal Server Error"},
    },
)

API_KEY = os.getenv("SPOONACULAR_API_KEY")
BASE_URL = "https://api.spoonacular.com"

#     ------------------      Endpoint to get recipes for SpoonacularAPI | User search by name or ingredient         ------------------

@router.get("/search/{title}", response_model=list[RecipeSchema])
def get_recipes_by_title(
    title: str,
    number: int = 5,
    meal_type: Optional[str] = Query(None),
    diet: Optional[str] = Query(None),
    prep_time: Optional[str] = Query(None),
    exclude_ingredients: Optional[List[str]] = Query(None),
    db: Session = Depends(get_db)
):
    
    query = db.query(Recipe).filter(Recipe.title.ilike(f"%{title}%"))

    if meal_type:
        query = query.filter(Recipe.meal_type == meal_type)

    if diet:
        query = query.filter(Recipe.diet == diet)

    if prep_time:
        if prep_time == "10-60":
            query = query.filter(Recipe.prep_time.between(10, 60))
        elif prep_time == "60-90":
            query = query.filter(Recipe.prep_time.between(60, 90))
        elif prep_time == "+90":
            query = query.filter(Recipe.prep_time > 90)

    if exclude_ingredients:
        for ing in exclude_ingredients:
            query = query.filter(~Recipe.ingredients.any(RecipeIngredient.ingredients.ilike(f"%{ing}%")))

    # Ejecutar la consulta local
    local_recipes = query.limit(number).all()

    # 1. Search the recipe in the database
    local_recipes = db.query(Recipe).filter(Recipe.title.ilike(f"%{title}%")).limit(number).all()

    # 2. If not found in the database, search in the Spoonacular API
    response = requests.get(
        f"{BASE_URL}/recipes/complexSearch",
        params={
            "query": title, 
            "number": number, 
            "apiKey": API_KEY},
    )
    

    if response.status_code != 200:
        raise HTTPException(status_code=500,detail="Error fetching data from API")
    data = response.json()
    results = data.get("results", [])

    if not results:
        raise HTTPException(status_code=404,detail="Recipe not found")

    # 3. Save the recipes to the database
    saved_recipes = []
    for recipe in results:
        # Check if the recipe already exists in the database
        existing_recipe = db.query(Recipe).filter_by(spoonacular_id=recipe["id"]).first()

        if existing_recipe:
            saved_recipes.append(existing_recipe)
            continue

        new_recipe = Recipe(
            title=recipe["title"],
            image=recipe["image"],
            spoonacular_id=recipe["id"],
            instructions="",
            cached=True
        )
        # Add the new recipe to the database
        db.add(new_recipe)
        saved_recipes.append(new_recipe)

        
    db.commit()


    all_recipes = {recipe.spoonacular_id: recipe for recipe in local_recipes + saved_recipes}

    return list(all_recipes.values())   

#       ------------------      Endpoint to get recipes by ingredient for SpoonacularAPI | User search by ingredient       ------------------

@router.get("/ingredients/")
def search_recipes_by_ingredients(
        ingredients: str = Query(..., description="Comma-separated list of ingredients"),
        number: int = Query(5, description="Number of recipes to return"),        
    ):
        url = f"{BASE_URL}/recipes/findByIngredients"

        params = {
            "ingredients": ingredients,
            "number": number,
            "apiKey": API_KEY,
        }

        response = requests.get(url, params=params)

        if response.status_code != 200:
            raise HTTPException(status_code=500,detail="Error fetching data from API")
        
        data = response.json()

        if not data:
             raise HTTPException(status_code=404,detail="Recipe not found")
        
        return data

#       ------------------       Endpoint to get similar recipes for SpoonacularAPI | Recommendation recipes by user search (cache)       ------------------      

@router.get("/{recipe_id}/similar_recipes", response_model=RecipesWithSimilarSchema)
def get_similar_recipes(
    title: str = Query(..., description="Title of the recipe"),
    number: int = Query(9, description="Number of similar recipes to return"),
    db: Session = Depends(get_db),
):
    # Buscar receta en la base de datos
    recipe = db.query(Recipe).filter(Recipe.title.ilike(f"%{title}%")).first()

    if recipe:
        similar_recipes = db.query(SimilarRecipe).filter(SimilarRecipe.recipe_id == recipe.id).all()
        if similar_recipes:
            return RecipesWithSimilarSchema(
                spoonacular_id=recipe.spoonacular_id,
                title=recipe.title,
                image=recipe.image,
                ingredients=recipe.ingredients,
                similar_recipes=[
                    SimilarRecipesSchema(
                        similar_spoonacular_id=sr.similar_recipe_id,
                        title=sr.title,
                        image=sr.image,
                    ) for sr in similar_recipes]
            )

    # Buscar hasta 3 recetas similares en la API
    search_url = f"{BASE_URL}/recipes/complexSearch"
    search_params = {
        "query": title,
        "number": 3,
        "apiKey": API_KEY,
    }

    search_response = requests.get(search_url, params=search_params)
    if search_response.status_code != 200 or not search_response.json().get("results"):
        raise HTTPException(status_code=500, detail="Error fetching data from API")

    results = search_response.json()["results"]
    if not results:
        raise HTTPException(status_code=404, detail="Recipe not found")

    # Guardar la primera receta como base
    first_result = results[0]
    spoonacular_id = first_result["id"]
    title = first_result["title"]
    image = first_result["image"]

    existing_recipe = db.query(Recipe).filter(Recipe.spoonacular_id == spoonacular_id).first()
    if existing_recipe:
        recipe = existing_recipe
    else:
        recipe = Recipe(
            spoonacular_id=spoonacular_id,
            title=title,
            image=image,
            ingredients=[]
        )
        db.add(recipe)
        db.commit()
        db.refresh(recipe)

    # Buscar similares de hasta 3 recetas base
    similar_recipes_list = []
    seen_ids = set()

    for result in results:
        base_id = result["id"]
        similar_url = f"{BASE_URL}/recipes/{base_id}/similar"
        similar_params = {
            "number": number,
            "apiKey": API_KEY,
        }
        response = requests.get(similar_url, params=similar_params)
        if response.status_code != 200:
            continue
        similar_data = response.json()

        for item in similar_data:
            if item["id"] in seen_ids:
                continue
            seen_ids.add(item["id"])

            image_url = f"https://spoonacular.com/recipeImages/{item['id']}-312x231.jpg"

            # Guardar en la BD
            similar_recipe = SimilarRecipe(
                recipe_id=recipe.id,
                similar_recipe_id=item["id"],
                title=item["title"],
                image=image_url,
            )
            db.add(similar_recipe)

            similar_recipes_list.append(SimilarRecipesSchema(
                similar_spoonacular_id=item["id"],
                title=item["title"],
                image=image_url,
            ))

            if len(similar_recipes_list) >= number:
                break
        if len(similar_recipes_list) >= number:
            break

    if not similar_recipes_list:
        raise HTTPException(status_code=404, detail="No similar recipes found")

    db.commit()

    return RecipesWithSimilarSchema(
        spoonacular_id=recipe.spoonacular_id,
        title=recipe.title,
        image=recipe.image,
        ingredients=recipe.ingredients,
        similar_recipes=similar_recipes_list
    )


    #       ------------------      Endpoint to get random recipes for SpoonacularAPI | Random recipes       ------------------      

@router.get("/random", response_model=list[RecipeSchema])
def get_random_recipes(
    number: int = Query(5, ge=1, le=20, description="Number of random recipes to return"),
    db: Session = Depends(get_db)
):
    url = f"{BASE_URL}/recipes/random"
    params = {
        "number": number,
        "apiKey": API_KEY,
    }

    response = requests.get(url, params=params)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Error fetching data from API")

    data = response.json()
    results = data.get("recipes", [])
    saved_recipes = []

    for item in results:
        spoonacular_id = item["id"]
        title = item["title"]
        image = item["image"]
        instructions = item.get("instructions", "")

        # Verifica si ya está en la base de datos
        existing = db.query(Recipe).filter(Recipe.spoonacular_id == spoonacular_id).first()
        if existing:
            saved_recipes.append(existing)
            continue

        ingredients = [
            RecipeIngredient(
                ingredients=ing["original"],
                quantity=str(ing.get("amount", "")),
                unit=ing.get("unit", "")
            )
            for ing in item.get("extendedIngredients", [])
        ]

        recipe = Recipe(
            title=title,
            image=image,
            spoonacular_id=spoonacular_id,
            instructions=instructions,
            ingredients=ingredients,
            cached=True
        )
        db.add(recipe)
        db.commit()
        db.refresh(recipe)
        saved_recipes.append(recipe)

    return saved_recipes

@router.get("/recipe_info/{spoonacular_id}")
def get_recipe_info(
    spoonacular_id: int,
    db: Session = Depends(get_db)
):
    url = f"{BASE_URL}/recipes/{spoonacular_id}/information"
    params = {
        "includeNutrition": True,
        "apiKey": API_KEY,
    }

    response = requests.get(url, params=params)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Error fetching data from API")
    
    return response.json()