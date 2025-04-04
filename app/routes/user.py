from fastapi import APIRouter, Depends, HTTPException
from app.db.models import User as UserModel
from app.schemas import User
from app.db.database import get_db
from sqlalchemy.orm import Session
from app.db import models

router = APIRouter(
    prefix="/user",
    tags=["user"]
)


# Welcome route
@router.get("/welcome")
def welcome_root():
    return {"Hello": "World"}

# Get all users
@router.get("/")
def get_users(db: Session = Depends(get_db)):
    data = db.query(models.User).all()
    return data

# Create a new user
@router.post("/")
def create_user(user: User, db: Session = Depends(get_db)):
    # Verify if user email already registered
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create a new user
    new_user = UserModel (
        name=user.name,
        email=user.email,
        password=user.password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}

# Get User by ID
@router.post("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Delete user by ID
@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User delete successfully"}

# Update user by ID
@router.put("/{user_id}")
def update_user(user_id: int, user: User, db: Session = Depends(get_db)):
    existing_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")
    existing_user.name = user.name
    existing_user.email = user.email
    existing_user.password = user.password
    db.commit()
    db.refresh(existing_user)
    return {"message": "User upated successfully"}