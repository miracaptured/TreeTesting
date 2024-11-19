from pydantic import BaseModel

from models.service.answer_group_schema import AnswerGroupSchema

class ResponseSchema(BaseModel):
    survey_id: str
    date_created: str
    answer_groups: list[AnswerGroupSchema]
    time_spent_seconds: int
