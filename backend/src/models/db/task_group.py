from models.db.base import Base
from sqlalchemy import Column, String, Integer

class TaskGroup(Base):
    __tablename__ = 'task_group'

    def __init__(self, survey_id, task_group_name, task_group_id):
        self.survey_id = survey_id
        self.task_group_name = task_group_name
        self.task_group_id = task_group_id
    
    def to_json(self) -> dict:
        return {
            'survey_id': self.survey_id,
            'task_group_name': self.task_group_name,
            'task_group_id': self.task_group_id
        }

    survey_id           =   Column(String, primary_key=True)
    task_group_name     =   Column(String, primary_key=True)
    task_group_id       =   Column(Integer)
