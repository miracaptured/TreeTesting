from models.db.base import Base
from sqlalchemy import Column, String, Integer, ARRAY

class Answer(Base):
    __tablename__ = 'answer'

    def __init__(
            self, survey_id, response_id,
            answer_group, task_id,
            answer_text, tree_trace, board):
        self.survey_id = survey_id
        self.response_id = response_id
        self.answer_group = answer_group
        self.task_id = task_id
        self.answer_text = answer_text
        self.tree_trace = tree_trace
        
        self.board = board
    
    def to_json(self) -> dict:
        return {
            'survey_id': self.survey_id,
            'response_id': self.response_id,
            'answer_group': self.answer_group,
            'task_id': self.task_id,
            'answer_text': self.answer_text,
            'tree_trace': self.tree_trace,
            'board': self.board
        }

    survey_id     =   Column(String, primary_key=True)
    response_id   =   Column(String, primary_key=True)
    answer_group  =   Column(String, primary_key=True)
    task_id       =   Column(Integer, primary_key=True)
    answer_text   =   Column(String)
    tree_trace    =   Column(ARRAY(String))
    board = Column(String)
