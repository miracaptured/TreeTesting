from dataaccess.dbsession import session_scope
from dataaccess.utils import Constants
from models.db import Response
from sqlalchemy import func

def get_response(response_id: str) -> Response:
    result = None
    with session_scope() as session:
        result = session.query(Response).where(Response.response_id == response_id).first()
    
    return result
    
def get_responses_by_survey(survey_id: str) -> list[Response]:
    result = []
    with session_scope() as session:
        result = session.query(Response).where(Response.survey_id == survey_id).all()

    return result

def count_responses_by_survey(survey_id: str) -> int:
    with session_scope() as session:
        return session.query(func.count(Response.response_id)).where(Response.survey_id == survey_id).scalar()

def add_response(response) -> Response:
    with session_scope() as session:
        session.add(response)

    return response
