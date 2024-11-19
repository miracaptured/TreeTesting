from models.db.base import Base
from sqlalchemy import Column, String, Integer, ARRAY

class Page(Base):
    __tablename__ = 'pages'

    def __init__(self, survey_id, page_id, tasks):
        self.survey_id = survey_id
        self.page_id = page_id
        self.tasks = tasks
    
    def to_json(self) -> dict:
        return {
            'tasks': self.tasks,
        }

    survey_id     =   Column(String, primary_key=True)
    page_id       =   Column(Integer, primary_key=True)
    tasks         =   Column(ARRAY(Integer))
