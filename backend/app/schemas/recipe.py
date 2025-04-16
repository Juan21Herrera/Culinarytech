from pydantic import BaseModel
from typing import Optional, List

class IngredientSchema(BaseModel):
    id: int
    ingredients: str
    quantity: Optional[str]
    unit: Optional[str]

    model_config = {
        "from_attributes": True
    }
    
class RecipeSchema(BaseModel):
    id: int
    title: str
    image: str
    spoonacular_id: int
    instructions: Optional[str]
    ingredients: list[IngredientSchema] = []
    cached: bool # Indicates if the recipe is cached in the database

    model_config = {
        "from_attributes": True
    }

class SimilarRecipesSchema(BaseModel):
    similar_spoonacular_id: int
    title: str
    image: Optional[str]

    model_config = {
        "from_attributes": True
    }


class RecipesWithSimilarSchema(BaseModel):
    spoonacular_id: int
    title: str
    image: str
    ingredients: List[IngredientSchema] = []
    similar_recipes: List[SimilarRecipesSchema] = []

    model_config = {
        "from_attributes": True
    }

class Ingredient(BaseModel):
    id: int
    spoonacular_id: int
    name: str
    image: str

    model_config = {
        "from_attributes": True
    }