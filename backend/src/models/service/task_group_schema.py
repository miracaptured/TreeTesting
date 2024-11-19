from pydantic import BaseModel

from models.service.task_schema import TaskSchema, TaskSchemaWithAnswers

class TaskGroupBaseSchema(BaseModel):
    name: str
    

class TaskGroupSchema(TaskGroupBaseSchema):
    tasks: list[TaskSchema]

class TaskGroupSchemaWithAnswers(TaskGroupBaseSchema):
    tasks: list[TaskSchemaWithAnswers]

