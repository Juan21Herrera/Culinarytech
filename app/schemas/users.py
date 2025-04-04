from pydantic import BaseModel
from datetime import datetime

# User Model (Class)

# Schema of User
class User(BaseModel):
    id: int
    name: str
    email: str
    password: str
    created_at: datetime = datetime.now()