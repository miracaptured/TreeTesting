from models.service import SurveySchema, ResponseSchema, TaskGroupSchema, TaskSchema, SurveyBaseDbSchema, SurveyDbSchema, AnswerSchema, AnswerGroupSchema
from models.db import Survey, Task, Response, Answer, TaskGroup, AnswerGroup
from dataaccess.storages import survey_storage, task_storage, response_storage, answer_storage
import uuid
from datetime import datetime

def add_survey(survey: SurveySchema, user_id, survey_id = None):
    if survey_id is None:
        survey_id = str(uuid.uuid4())

    survey_storage.add_survey(Survey(
        survey_id=survey_id,
        creator_id=user_id,
        name=survey.name,
        description=survey.description,
        date_created=datetime.now()
    ))

    for idtaskgroup, task_group in enumerate(survey.task_groups):
        task_storage.add_task_group(TaskGroup(
            survey_id=survey_id,
            task_group_name=task_group.name,
            task_group_id=idtaskgroup
        ))
        for task_id, task in enumerate(task_group.tasks):
            task_storage.add_task(Task(
                survey_id=survey_id,
                task_group_name=task_group.name,
                task_id=task_id,
                name=task.name,
                question=task.question,
                type=task.type,
                answer_variants=task.answer_variants,
                tree=task.tree,
                true_answer=task.true_answer,
                true_route=task.true_route,
                card_sort_categories=task.card_sort_categories,
                card_sort_values=task.card_sort_values,
                card_sort_type=task.card_sort_type
            ))
    
    return survey_id

def delete_survey(survey_id) -> str:
    return survey_storage.delete_survey(survey_id)

def update_survey(survey_new_version: SurveyDbSchema):
    return survey_storage.update_survey(survey_new_version)

def get_survey(survey_id) -> SurveyDbSchema:
    survey = survey_storage.get_survey(survey_id)
    if survey is None:
        return None
    
    result = SurveyDbSchema(
        survey_id=survey.survey_id,
        name=survey.name,
        date_created=str(survey.date_created),
        description=survey.description,
        task_groups=[]
    )

    db_task_groups = task_storage.get_task_groups_by_survey(survey_id)
    db_task_groups.sort(key=lambda group: group.task_group_id)

    for db_task_group in db_task_groups:
        task_group = TaskGroupSchema(name=db_task_group.task_group_name, tasks=[])
        db_tasks_by_group = task_storage.get_tasks_by_task_group(survey_id, db_task_group.task_group_name)
        for db_task in db_tasks_by_group:
            task_group.tasks.append(TaskSchema(
                type=db_task.type,
                name=db_task.name,
                question=db_task.question,
                answer_variants=db_task.answer_variants,
                tree=db_task.tree,
                true_answer=db_task.true_answer,
                true_route=db_task.true_route,
                card_sort_categories=db_task.card_sort_categories,
                card_sort_values=db_task.card_sort_values,
                card_sort_type=db_task.card_sort_type
            ))
        result.task_groups.append(task_group)

    return result

def get_survey_list(creator_id) -> list[SurveyBaseDbSchema]:
    surveys = survey_storage.get_surveys_by_creator(creator_id)
    return list(map(
        lambda survey: SurveyBaseDbSchema(
            name=survey.name,
            date_created=str(survey.date_created),
            description=survey.description,
            survey_id=survey.survey_id
            ),
        surveys))

def add_response(response: ResponseSchema):
    response_id = str(uuid.uuid4())
    response_storage.add_response(Response(
        response_id=response_id,
        survey_id=response.survey_id,
        date_created=datetime.now(),
        time_spent_seconds=response.time_spent_seconds
    ))

    for answer_group in response.answer_groups:
        answer_storage.add_answer_group(AnswerGroup(
            response_id=response_id,
            task_group_name=answer_group.name,
            time_spent_seconds=answer_group.time_spent_seconds,
        ))
        for answer in answer_group.answers:
            answer_storage.add_answer(Answer(
                survey_id=response.survey_id,
                response_id=response_id,
                answer_group=answer_group.name,
                task_id=answer.task_id,
                answer_text=answer.text,
                tree_trace=answer.click_trace,
                board=answer.board
            ))

    return response_id

def get_responses_by_survey(survey_id: str) -> list[ResponseSchema]:
    db_responses = response_storage.get_responses_by_survey(survey_id)
    
    result = []
    for db_response in db_responses:
        response = ResponseSchema(
            survey_id=db_response.survey_id,
            date_created=str(db_response.date_created),
            answer_groups=[],
            time_spent_seconds=db_response.time_spent_seconds
        )
        db_answer_groups = answer_storage.get_answer_groups_by_response_id(db_response.response_id)
        for db_answer_group in db_answer_groups:
            answer_group = AnswerGroupSchema(
                name=db_answer_group.task_group_name,
                answers=[],
                time_spent_seconds=db_answer_group.time_spent_seconds
            )
            db_answers = answer_storage.get_answers_by_group(survey_id, db_answer_group.task_group_name)
            for db_answer in db_answers:
                answer = AnswerSchema(
                    task_id=db_answer.task_id,
                    click_trace=db_answer.tree_trace,
                    text=db_answer.answer_text,
                    board=db_answer.board                    
                )
                answer_group.answers.append(answer)
            response.answer_groups.append(answer_group)
        result.append(response)

    return result

def get_survey_with_answers(survey_id: str):
    return survey_storage.get_survey_with_answers(survey_id)
