from pydantic import BaseModel
from typing import Optional

class RecipeSchema(BaseModel):
    id: int
    title: str
    image: str
    spoonacular_id: int
    instructions: Optional[str]
    ingredients: Optional[str]
    cached: bool
    

    class Config:
        orm_mode = True