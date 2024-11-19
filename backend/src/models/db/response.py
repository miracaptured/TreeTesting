from models.db.base import Base
from sqlalchemy import Column, String, Integer, DateTime

class Response(Base):
    __tablename__ = 'response'

    def __init__(self, response_id, survey_id, date_created, time_spent_seconds):
        self.response_id = response_id
        self.survey_id = survey_id
        self.date_created = date_created
        self.time_spent_seconds = time_spent_seconds
    
    def to_json(self) -> dict:
        return {
            'response_id': self.response_id,
            'survey_id': self.survey_id,
            'date_created': self.date_created,
            'time_spent_seconds': self.time_spent_seconds,
        }

    response_id   =   Column(String, primary_key=True)
    survey_id     =   Column(String, primary_key=True)
    date_created  =   Column(DateTime)
    time_spent_seconds = Column(Integer)
