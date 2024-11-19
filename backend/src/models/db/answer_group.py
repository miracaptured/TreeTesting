from models.db.base import Base
from sqlalchemy import Column, Integer, String

class AnswerGroup(Base):
    __tablename__ = 'answer_group'

    def __init__(self, response_id, task_group_name, time_spent_seconds):
        self.response_id = response_id
        self.task_group_name = task_group_name
        self.time_spent_seconds = time_spent_seconds
    
    def to_json(self) -> dict:
        return {
            'response_id': self.response_id,
            'task_group_name': self.task_group_name,
            'time_spent_seconds': self.time_spent_seconds
        }

    response_id           =   Column(String, primary_key=True)
    task_group_name     =   Column(String, primary_key=True)
    time_spent_seconds = Column(Integer)
