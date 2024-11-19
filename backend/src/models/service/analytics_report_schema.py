from typing import Union
from pydantic import BaseModel
from models.service.task_info import TaskInfo

class AnalyticsReportSchema(BaseModel):
    survey_id: str
    survey_name: str
    date_created: str
    total_responses: int

    def toJSON(self):
        return {
            "surveyId": self.survey_id,
            "surveyName": self.survey_name,
            "dateCreated": self.date_created,
            "totalResponses": self.total_responses,
        }

class AnalyticsReportExtendedSchema(AnalyticsReportSchema):
    average_time: int
    min_time: int
    max_time: int
    tasks_info: list[TaskInfo]

    def toJSON(self):
        return {
            "surveyId": self.survey_id,
            "surveyName": self.survey_name,
            "dateCreated": self.date_created,
            "totalResponses": self.total_responses,
            "averageTime": self.average_time,
            "minTime": self.min_time,
            "maxTime": self.max_time,
            "tasksInfo": [task_info.toJSON() for task_info in self.tasks_info]
        }
