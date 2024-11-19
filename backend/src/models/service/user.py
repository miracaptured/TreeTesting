from typing import Union
from pydantic import BaseModel, Field, EmailStr

class UserBase(BaseModel):
    username: str = Field(...)
    email: Union[str, None] = EmailStr(...)

class User(UserBase):
    user_id: int = Field(default=None)

class UserInDb(User):
    hashed_password: str
