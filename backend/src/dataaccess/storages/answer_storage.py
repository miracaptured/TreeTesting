from dataaccess.dbsession import session_scope
from dataaccess.utils import Constants
from models.db import Answer, AnswerGroup, Response, Survey, TaskGroup, Task
from sqlalchemy import select

def get_answer_group(response_id: str, task_group_name: str) -> AnswerGroup:
    with session_scope() as session:
        return session.query(AnswerGroup)\
            .where(AnswerGroup.response_id == response_id)\
            .where(AnswerGroup.task_group_name == task_group_name).first()

def get_answer_groups_by_response_id(response_id: str) -> list[AnswerGroup]:
    with session_scope() as session:
        return session.query(AnswerGroup)\
            .where(AnswerGroup.response_id == response_id).all()

def get_answer_groups_by_task_group(survey_id: str, task_group: str) -> list[AnswerGroup]:
    with session_scope() as session:
        return session.query(AnswerGroup)\
            .join(TaskGroup, AnswerGroup.task_group_name == TaskGroup.task_group_name)\
            .where((TaskGroup.survey_id == survey_id) & (AnswerGroup.task_group_name == task_group)).all()

def add_answer_group(answer_group: AnswerGroup) -> AnswerGroup:
    with session_scope() as session:
        session.add(answer_group)
    
    return answer_group

def update_answers_and_groups(survey_id: str, old_task_group_name: str, new_task_group_name: str):
    with session_scope() as session:
        # update answer groups
        session.query(AnswerGroup)\
            .join(TaskGroup, AnswerGroup.task_group_name == TaskGroup.task_group_name)\
            .where((TaskGroup.survey_id == survey_id) & (AnswerGroup.task_group_name == old_task_group_name))\
            .update({AnswerGroup.task_group_name: new_task_group_name}, synchronize_session=False)

        # update answers
        session.query(Answer)\
            .where((Answer.survey_id == survey_id) & (Answer.answer_group == old_task_group_name))\
            .update({Answer.answer_group: new_task_group_name}, synchronize_session=False)


def get_answers_by_group(survey_id: str, answer_group: str) -> list[Answer]:
    with session_scope() as session:
        return session.query(Answer)\
            .where(Answer.survey_id == survey_id)\
            .where(Answer.answer_group == answer_group).all()

def add_answer(answer: Answer) -> Answer:
    with session_scope() as session:
        session.add(answer)
    
    return answer
