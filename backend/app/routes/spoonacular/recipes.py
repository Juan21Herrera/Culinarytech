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

# @router.get("/ingredients/")
# def search_recipes_by_ingredients(
#         ingredients: str = Query(..., description="Comma-separated list of ingredients"),
#         number: int = Query(5, description="Number of recipes to return"),        
#     ):
#         url = f"{BASE_URL}/recipes/findByIngredients"

#         params = {
#             "ingredients": ingredients,
#             "number": number,
#             "apiKey": API_KEY,
#         }

#         response = requests.get(url, params=params)

#         if response.status_code != 200:
#             raise HTTPException(status_code=500,detail="Error fetching data from API")
        
#         data = response.json()

#         if not data:
#              raise HTTPException(status_code=404,detail="Recipe not found")
        
