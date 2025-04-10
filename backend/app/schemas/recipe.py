from pydantic import BaseModel
from typing import Optional, List

class RecipeSchema(BaseModel):
    id: int
    title: str
    image: str
    spoonacular_id: int
    instructions: Optional[str]
    ingredients: Optional[List[str]]
    cached: bool # Indicates if the recipe is cached in the database
    

    class Config:
        orm_mode = True

class RecipeIngredient(BaseModel):
    id: int
    recipe_id: int
    ingredients: str
    quantity: Optional[str]
    unit: Optional[str]

    class Config:
        orm_mode = True

class SimilarRecipesSchema(BaseModel):
    similar_spoonacular_id: int
    title: str
    image: Optional[str]

    class Config:
        orm_mode = True

class RecipesWithSimilarSchema(BaseModel):
    similar_recipes: List[SimilarRecipesSchema] = []

    class Config:
        orm_mode = True
