from pydantic import BaseModel

class AnswerSchema(BaseModel):
    task_id: int
    answer_group: str
    click_trace: list[str]
    text: str
    board: str

class AnswerSchemaExtended(AnswerSchema):
    response_id: str
