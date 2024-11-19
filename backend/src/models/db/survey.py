from models.db.base import Base
from sqlalchemy import Column, String, Integer, DateTime

class Survey(Base):
    __tablename__ = 'survey'

    def __init__(self, survey_id, creator_id, name, description, date_created):
        self.survey_id = survey_id
        self.creator_id = creator_id
        self.name = name
        self.description = description
        self.date_created = date_created
    
    def to_json(self) -> dict:
        return {
            'survey_id': self.survey_id,
            'creator_id': self.creator_id,
            'name': self.name,
            'description': self.description,
            'date_created': self.date_created
        }

    survey_id     =   Column(String, primary_key=True)
    creator_id    =   Column(Integer)
    name          =   Column(String)
    description   =   Column(String)
    date_created  =   Column(DateTime)
