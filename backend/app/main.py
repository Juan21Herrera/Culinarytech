from fastapi import FastAPI
import uvicorn
from app.routes import user
from app.routes.spoonacular import recipes
from app.db.database import Base, engine

def create_tables():
    Base.metadata.create_all(bind=engine)
create_tables()


app = FastAPI()
app.include_router(user.router)
app.include_router(recipes.router)



if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
