import dataaccess.storages.user_storage as user_storage
from models.service import UserBase, User, UserInDb
from models.mapping import user_mapper

def get_user(email: str) -> UserBase:
    return user_mapper.convertToUserSchema(user_storage.get_user_by_email(email))

def get_user_db(email: str) -> UserInDb:
    return user_mapper.convertToUserInDb(user_storage.get_user_by_email(email))

def add_user(user: UserBase, password: str) -> User:
    return user_mapper.convertToUserSchema(user_storage.add_user(user_mapper.convertToDbUser(user), password))
