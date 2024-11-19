from models.db import Answer
from models.service import AnswerSchemaExtended

def convertToAnswerSchemaExtended(answer: Answer) -> AnswerSchemaExtended:
    if not answer: return None

    return AnswerSchemaExtended(
        response_id=answer.response_id,
        task_id=answer.task_id,
        answer_group=answer.answer_group,
        click_trace=answer.tree_trace,
        text=answer.answer_text,
        board=answer.board)
