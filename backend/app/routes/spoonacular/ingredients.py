from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.models.db_recipes import Ingredient
from app.schemas.recipe import Ingredient
from app.db.database import get_db
from dotenv import load_dotenv
import os, requests

# Import environment variables
load_dotenv()

router = APIRouter(
    prefix="/ingredient",
    tags=["Spoonacular"],
    responses={
        404: {"description": "Ingredient not found"},
        500: {"description": "Internal Server Error"},
    },
)

API_KEY = os.getenv("SPOONACULAR_API_KEY")
BASE_URL = "https://api.spoonacular.com"


# Endpoint search ingredients for SpoonacularAPI | User filter by ingredients

@router.get("/search")
def search_ingredients(
    query: str = Query(..., description="Search query for ingredients"),
    number: int = Query(10, description="Number of results to return"),
    db: Session = Depends(get_db),
):
    
    # Check if the ingredient is already in the database
    local_ingredients = db.query(Ingredient).filter(Ingredient.name.ilike(f"%{query}%")).limit(number).all()

    if local_ingredients:
        return local_ingredients
    
    # If not found in the database, search in the Spoonacular API

    url: str = f"{BASE_URL}/food/ingredients/search"
    params = {
        "query": query,
        "apiKey": API_KEY,
        "number": number,
    }

    response = requests.get(url, params=params)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Error fetching data from API")
    
    data = response.json()

    if not data.get("results"):
        raise HTTPException(status_code=404, detail="No ingredients found")
    
    ingredients_to_store = []
    for item in data["results"]:
        ingredient = Ingredient(
            id=item["id"],
            name=item["name"],
            image=item["image"],
        )
        
        # No dupe ingredients
        if not db.query(Ingredient).filter_by(id = ingredient.id).first():
            db.add(ingredient)
            ingredients_to_store.append(ingredient)

    db.commit()

    return ingredients_to_store  

# Endpoint get parse ingredient information | resume ingredient information (calories, carbs, fat, protein, etc.)

# Endpoint convert amounts | convert amounts (grams, ounces, cups, etc.)

# Endpoint Compute glycemic index & load | compute glycemic index (low, medium, high) and total glycemic load for a list of ingredients (total & per serving)

# Endpoint to get substitutes for ingredients | get substitutes for a list of ingredients (e.g. gluten-free, dairy-free, etc.)