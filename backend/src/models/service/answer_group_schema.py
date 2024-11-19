from pydantic import BaseModel

from models.service.answer_schema import AnswerSchema

class AnswerGroupSchema(BaseModel):
    name: str
    answers: list[AnswerSchema]
    time_spent_seconds: int
