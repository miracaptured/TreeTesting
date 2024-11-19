from models.db import Survey
from models.service import SurveySchemaWithAnswers, TaskGroupSchemaWithAnswers

def convertToSurveySchemaWithAnswers(survey: Survey, task_groups: list[TaskGroupSchemaWithAnswers]) -> SurveySchemaWithAnswers:
    if not survey: return None

    return SurveySchemaWithAnswers(
        name=survey.name,
        date_created=str(survey.date_created),
        description=survey.description,
        survey_id=survey.survey_id,
        task_groups = task_groups
    )