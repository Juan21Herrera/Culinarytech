from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta

#Config
SECRET_KEY = "as84sfg842qwt855da1q85fjiyupg521fth82"
ALGORITHM = "HS256" 
ACCESS_TOKEN_EXPIRE_MINUTES = 60

#Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password , hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def hash_password(password: str) -> str:
    return pwd_context.hash(password)