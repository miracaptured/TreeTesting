from pydantic import BaseModel
from models.service.answer_schema import AnswerSchemaExtended

class TaskSchema(BaseModel):
    type: int
    name: str
    question: str
    answer_variants: list[str]
    tree: str
    true_answer: str
    true_route: list[str]
    card_sort_categories: list[str]
    card_sort_values: list[str]
    card_sort_type: int

class TaskSchemaWithAnswers(TaskSchema):
    answers: list[AnswerSchemaExtended]

