from dataaccess.dbsession import session_scope
from dataaccess.utils import Constants
from models.db import Task, TaskGroup

def get_task_group(survey_id: str, task_group_name: str) -> TaskGroup:
    with session_scope() as session:
        return session.query(TaskGroup)\
            .where(TaskGroup.survey_id == survey_id)\
            .where(TaskGroup.task_group_name == task_group_name).first()

def get_task_groups_by_survey(survey_id: str) -> list[TaskGroup]:
    with session_scope() as session:
        return session.query(TaskGroup)\
            .where(TaskGroup.survey_id == survey_id).all()

def add_task_group(task_group: TaskGroup) -> TaskGroup:
    with session_scope() as session:
        session.add(task_group)
    
    return task_group

def get_task(survey_id: str, task_group_name: str, task_id: int) -> Task:
    with session_scope() as session:
        return session.query(Task)\
            .where(Task.survey_id == survey_id)\
            .where(Task.task_group_name == task_group_name)\
            .where(Task.task_id == task_id).first()

def add_task(task: Task) -> Task:
    with session_scope() as session:
        session.add(task)
    
    return task

def get_tasks_by_task_group(survey_id: str, task_group_name: str) -> list[Task]:
    with session_scope() as session:
        return session.query(Task)\
            .where(Task.survey_id == survey_id)\
            .where(Task.task_group_name == task_group_name).all()

def get_tasks_by_survey(survey_id: str) -> list[Task]:
    with session_scope() as session:
        return session.query(Task)\
            .where(Task.survey_id == survey_id)\
            .join(TaskGroup, TaskGroup.task_group_name == Task.task_group_name)\
            .order_by(TaskGroup.task_group_id)\
            .order_by(Task.task_id).all()
