from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.db_recipes import Recipe
from app.schemas.recipe import RecipeSchema
from app.db.database import get_db
from dotenv import load_dotenv
import os, requests

# Import environment variables
load_dotenv()

router = APIRouter(
    prefix="/recipes",
    tags=["spoonacular"],
    responses={
        404: {"description": "Recipe not found"},
        500: {"description": "Internal Server Error"},
    },
)

API_KEY = os.getenv("SPOONACULAR_API_KEY")
BASE_URL = "https://api.spoonacular.com"

# Endpoint to get recipes for SpoonacularAPI | User search by name or ingredient
@router.get("/search/{title}", response_model=list[RecipeSchema])
def get_recipes_by_title(title: str, number: int = 5, db: Session = Depends(get_db)):

    # 1. Search the recipe in the database
    local_recipes = db.query(Recipe).filter(Recipe.title.ilike(f"%{title}%")).limit(number).all()


# 2. If not found in the database, search in the Spoonacular API

    response = requests.get(
        f"{BASE_URL}/recipes/complexSearch",
        params={"query": title, "number": number, "apiKey": API_KEY},
    )
    

    if response.status_code != 200:
        raise HTTPException(status_code=500,detail="Internal Server Error")
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
            ingredients="",
            cached=True
        )
        # Add the new recipe to the database
        db.add(new_recipe)
        saved_recipes.append(new_recipe)
        
    db.commit()
    all_recipes = {recipe.spoonacular_id: recipe for recipe in local_recipes + saved_recipes}
    return list(all_recipes.values())






# Endpoint to get all recipes for SpoonacularAPI | Return all recipes

# Endpoint to get recipes by ingredient for SpoonacularAPI | User search by ingredient

# Endpoint to get similar recipes for SpoonacularAPI | Recommendation recipes by user search (cache)

# Endpoint to get random recipes for SpoonacularAPI | Random recipes