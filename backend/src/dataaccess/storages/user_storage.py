import sqlalchemy as sa
from sqlalchemy import exists

from dataaccess.dbsession import session_scope
from models.db import User

def user_exists(email: str) -> bool:
    with session_scope() as session:
        return session.query(exists().where(User.email == email)).scalar()

def get_user_by_email(email: str) -> User:
    with session_scope() as session:
        result = session.query(User).where(User.email == email).first()
    return result

def add_user(user: User, hashed_password: str) -> User:
    with session_scope() as session:
            user.hashed_password = hashed_password
            session.add(user)
    return user

