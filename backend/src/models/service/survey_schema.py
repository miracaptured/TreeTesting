from pydantic import BaseModel
from models.service.task_group_schema import TaskGroupSchema, TaskGroupSchemaWithAnswers

class SurveyBaseSchema(BaseModel):
    name: str
    date_created: str
    description: str

class SurveyBaseDbSchema(SurveyBaseSchema):
    survey_id: str

class SurveySchema(SurveyBaseSchema):
    task_groups: list[TaskGroupSchema]

class SurveyDbSchema(SurveySchema):
    survey_id: str

class SurveySchemaWithAnswers(SurveyBaseDbSchema):
    task_groups: list[TaskGroupSchemaWithAnswers]

