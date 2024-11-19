from models.db import User as DbUser
from models.service import UserBase, UserInDb

def convertToUserSchema(user: DbUser) -> UserBase:
    if not user: return None

    return UserBase(**user.__dict__)

def convertToUserInDb(user: DbUser) -> UserInDb:
    if not user: return None

    return UserInDb(**user.__dict__)
        

def convertToDbUser(user: UserBase) -> DbUser:
    if not user: return None

    return DbUser(**user.__dict__)
