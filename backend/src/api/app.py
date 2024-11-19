
from datetime import timedelta
from fastapi import FastAPI, HTTPException, Depends, Request, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from models.service import SurveySchema, ResponseSchema, UserBase, SurveyDbSchema
from dataaccess.config import SSL_KEY
from services import user_service, survey_service, analytics_service
from sqlalchemy.exc import SQLAlchemyError
from typing import Annotated
from .auth import ACCESS_TOKEN_EXPIRE_MINUTES, AdditionalUserDataForm, Token, authenticate, create_access_token, get_current_active_user, hash_password
import json, typing
from starlette.responses import Response

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:4200",
    "*"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Settings(BaseModel):
    authjwt_secret_key: str = SSL_KEY

class PrettyJSONResponse(Response):
    media_type = "application/json"

    def render(self, content: typing.Any) -> bytes:
        return json.dumps(
            content,
            ensure_ascii=False,
            allow_nan=False,
            indent=4,
            separators=(", ", ": "),
        ).encode("utf-8")

@app.get("/config", response_class=PrettyJSONResponse)
def get_config():
    return app.state.config

@app.exception_handler(SQLAlchemyError)
def sql_exception_handler(request: Request, exc: SQLAlchemyError):
    return JSONResponse(
        status_code=500,
        content={"detail":exc._message()}
    )

@app.post("/login")
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
):
    user = authenticate(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {
        'creds': Token(access_token=access_token, token_type="bearer"),
        'user': user
    }

@app.post("/register")
async def register(
    form_data: OAuth2PasswordRequestForm = Depends(),
    additional_data: AdditionalUserDataForm = Depends(),
):
    if (user_service.get_user(form_data.username)):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User already exists",
        )
    
    user = user_service.add_user(UserBase(
        username=additional_data.name,
        email=form_data.username,
    ), hash_password(form_data.password))

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires
    )
    print(user)
    return {
        'creds': Token(access_token=access_token, token_type="bearer"),
        'user': user
    }

@app.get("/user/me/", response_model=UserBase)
async def read_users_me(
    current_user: Annotated[UserBase, Depends(get_current_active_user)],
):
    return current_user


@app.get("/survey/{survey_id}")
async def get_survey(survey_id: str):
    returned_survey = survey_service.get_survey(survey_id)
    if returned_survey is None:
        return {}
    return {
        "data": returned_survey
    }

@app.post("/survey")
async def create_survey(survey: SurveySchema, user: Annotated[UserBase, Depends(get_current_active_user)],):
    creator_id = user_service.get_user_db(user.email).user_id
    result = survey_service.add_survey(survey, creator_id)
    return {
        "data": result
    }

@app.post("/survey/{survey_id}")
async def update_survey(survey_id: str, survey: SurveyDbSchema, _: Annotated[UserBase, Depends(get_current_active_user)],):
    result = survey_service.update_survey(survey)

    return {
        "data": result
    }

@app.delete("/survey/{survey_id}")
async def delete_survey(survey_id: str, _: Annotated[UserBase, Depends(get_current_active_user)],):
    result = survey_service.delete_survey(survey_id)

    return {
        "data": result
    }


@app.post("/survey/response/{survey_id}")
async def add_response(response: ResponseSchema):
    result = survey_service.add_response(response)

    return {
        "data": result
    }

@app.get("/survey/{survey_id}/answers")
async def get_responses_by_survey(survey_id: str, _: Annotated[UserBase, Depends(get_current_active_user)],):
    result = survey_service.get_survey_with_answers(survey_id)

    return {
        "data": result
    }

@app.get("/survey/response/{survey_id}/file", responses={
    200: {
        "content": {"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {}}
    },
}, response_class=Response)
async def get_responses_by_survey_file(survey_id: str, _: Annotated[UserBase, Depends(get_current_active_user)],):
    result = analytics_service.get_all_responses_file(survey_id)

    return Response(content=result,
                    media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")

@app.get("/analytics/my/{survey_id}")
async def get_analytics(survey_id: str, _: Annotated[UserBase, Depends(get_current_active_user)],):
    result = analytics_service.get_analytics_report(survey_id)
    return {
        "data": result.toJSON()
    }

@app.get("/analytics/my")
async def get_analytics_list(user: Annotated[UserBase, Depends(get_current_active_user)],):
    creator_id = user_service.get_user_db(user.email).user_id
    return {
        "data": list(map(lambda r: r.toJSON(), analytics_service.get_reports_list(creator_id)))
    }