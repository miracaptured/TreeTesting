from dataaccess.dbsession import session_scope
from dataaccess.utils import Constants
from models.db import Survey, TaskGroup, Task, Answer, AnswerGroup, Response
from models.service import SurveyDbSchema, TaskSchemaWithAnswers, TaskGroupSchemaWithAnswers, SurveySchemaWithAnswers
from models.mapping.answer_mapper import convertToAnswerSchemaExtended
from models.mapping.task_mapper import convertToTaskSchemaWithAnswers, convertToTaskGroupSchemaWithAnswers
from models.mapping.survey_mapper import convertToSurveySchemaWithAnswers

def get_survey(survey_id: str) -> Survey:
    result = None
    with session_scope() as session:
        result = session.query(Survey).where(Survey.survey_id == survey_id).first()
    
    return result
    
def get_surveys_by_creator(creator_id: int) -> list[Survey]:
    result = []
    with session_scope() as session:
        result = session.query(Survey).where(Survey.creator_id == creator_id).all()

    return result

def add_survey(survey: Survey) -> Survey:
    with session_scope() as session:
        session.add(survey)

    return survey

def delete_survey(survey_id: str) -> str:
    with session_scope() as session:
        # delete answers
        session.query(Answer).where(Answer.survey_id == survey_id).delete()
        # delete answer groups
        responses_filter = session.query(Response).filter(Response.survey_id == survey_id)
        responses_subquery = responses_filter.with_entities(Response.response_id)
        session.query(AnswerGroup)\
            .filter(AnswerGroup.response_id.in_(responses_subquery)).delete()
        # delete responses
        responses_filter.delete()
        # delete tasks
        session.query(Task).where(Task.survey_id == survey_id).delete()
        # delete task groups
        session.query(TaskGroup).where(TaskGroup.survey_id == survey_id).delete()
        # delete survey
        session.query(Survey).where(Survey.survey_id == survey_id).delete()
    
    return survey_id

def update_survey(survey: SurveyDbSchema):
    with session_scope() as session:
        responses_filter = session.query(Response).filter(Response.survey_id == survey.survey_id)
        responses_subquery = responses_filter.with_entities(Response.response_id)

        for idtaskgroup, task_group in enumerate(survey.task_groups):
            # update answers
            old_task_group_query = session.query(TaskGroup)\
                .where((TaskGroup.survey_id == survey.survey_id) & (TaskGroup.task_group_id == idtaskgroup))
            old_task_group = old_task_group_query.first()

            if old_task_group.task_group_name == task_group.name: continue

            answers = session.query(Answer)\
                .where((Answer.survey_id == survey.survey_id) & (Answer.answer_group == old_task_group.task_group_name))
            if answers:
                answers.update({Answer.answer_group: task_group.name})
            
            # update answer groups
            answer_groups = session.query(AnswerGroup)\
                .where((AnswerGroup.response_id.in_(responses_subquery)) & (AnswerGroup.task_group_name == old_task_group.task_group_name))
            if answer_groups:
                answer_groups.update({AnswerGroup.task_group_name: task_group.name})
            
            # update task_group
            old_task_group_query.update({TaskGroup.task_group_name: task_group.name})

            # update tasks
            for task_id, task in enumerate(task_group.tasks):
                session.query(Task)\
                    .where((Task.survey_id == survey.survey_id) &\
                           (Task.task_group_name == old_task_group.task_group_name) &\
                           (Task.task_id == task_id))\
                    .update({
                        Task.task_group_name: task_group.name,
                        Task.question: task.question
                    })
    
    return survey.survey_id


def get_survey_with_answers(survey_id: str) -> SurveySchemaWithAnswers:
    with session_scope() as session:
        survey_from_db = session.query(Survey).where(Survey.survey_id == survey_id).first()
        task_groups_query = session.query(TaskGroup)\
            .where(TaskGroup.survey_id == survey_id)\
            .order_by(TaskGroup.task_group_id)

        task_groups = []
        for task_group in task_groups_query:
            tasks_query = session.query(Task)\
                .where((Task.survey_id == survey_id) & (Task.task_group_name == task_group.task_group_name))\
                .order_by(Task.task_id)
            tasks = []
            for task in tasks_query:
                answers_query = session.query(Answer)\
                    .where((Answer.survey_id == survey_id) &\
                           (Answer.answer_group == task.task_group_name) &\
                           (Answer.task_id == task.task_id))
                answers = list(map(lambda answer: convertToAnswerSchemaExtended(answer), answers_query.all()))
                tasks.append(convertToTaskSchemaWithAnswers(task, answers))
            task_groups.append(convertToTaskGroupSchemaWithAnswers(task_group, tasks))
        
        result = convertToSurveySchemaWithAnswers(survey_from_db, task_groups)
    
    return result

