from models.db import Task, TaskGroup
from models.service import TaskSchemaWithAnswers, TaskGroupSchemaWithAnswers, AnswerSchema

def convertToTaskSchemaWithAnswers(task: Task, answers: list[AnswerSchema]) -> TaskSchemaWithAnswers:
    if not task: return None

    return TaskSchemaWithAnswers(**task.__dict__, answers=answers)


def convertToTaskGroupSchemaWithAnswers(task_group: TaskGroup, tasks: list[TaskGroupSchemaWithAnswers]) -> TaskGroupSchemaWithAnswers:
    if not task_group: return None

    return TaskGroupSchemaWithAnswers(name=task_group.task_group_name, tasks=tasks)
