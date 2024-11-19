from models.db import Base
from sqlalchemy import Column, ForeignKey, String, Integer, Sequence

USER_ID = Sequence('user_id_seq')

class User(Base):
    __tablename__ = 'users'

    def __init__(self, email, username, hashed_password=None, user_id=None):
        self.user_id = user_id
        self.email = email
        self.username = username
        self.hashed_password = hashed_password

    user_id = Column(Integer, USER_ID, primary_key=True)
    email = Column(String)
    username = Column(String)
    hashed_password = Column(String)
