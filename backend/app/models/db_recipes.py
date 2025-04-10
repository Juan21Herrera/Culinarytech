from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

# Model for the Recipe table in the database
# This model defines the structure of the Recipe table and its columns.
class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    image = Column(String, index=True)
    spoonacular_id = Column(Integer, unique=True, index=True)
    instructions = Column(String, index=True)
    ingredients = Column(String, index=True)
    cached = Column(Boolean, default=True)

    similar_recipes = relationship("SimilarRecipes", back_populates="recipe")

    def __repr__(self):
        return f"<Recipe(id={self.id}, title={self.title}, image={self.image})>"
    
class SimilarRecipes(Base):
    __tablename__ = "similar_recipes"

    id = Column(Integer, primary_key=True, index=True)
    recipe_id = Column(Integer, ForeignKey("recipes.id"), index=True)
    similar_recipe_id = Column(Integer, index=True)
    title = Column(String, index=True)
    image = Column(String, index=True)
    recipe = relationship("Recipe", back_populates="similar_recipes")