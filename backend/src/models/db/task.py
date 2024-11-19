from models.db.base import Base
from sqlalchemy import Column, String, Integer, Boolean, ARRAY

class Task(Base):
    __tablename__ = 'task'

    def __init__(
            self, survey_id, task_id, name,
            task_group_name, question,
            type, answer_variants, tree,
            true_answer, true_route,
            card_sort_categories, card_sort_values, card_sort_type
        ):
        self.task_group_name = task_group_name
        self.survey_id = survey_id
        self.task_id = task_id
        self.name = name
        self.question = question
        self.type = type
        self.answer_variants = answer_variants
        self.tree = tree
        self.true_answer = true_answer
        self.true_route = true_route
        self.card_sort_categories = card_sort_categories
        self.card_sort_values = card_sort_values
        self.card_sort_type = card_sort_type
    
    def to_json(self) -> dict:
        return {
            'task_group_name': self.task_group_name,
            'survey_id': self.survey_id,
            'task_id': self.task_id,
            'name': self.name,
            'question': self.question,
            'type': self.type,
            'answer_variants': self.answer_variants,
            'tree': self.tree,
            'true_answer': self.true_answer,
            'true_route': self.true_route,
            'card_sort_type': self.card_sort_type,
            'card_sort_values': self.card_sort_values,
            'card_sort_categories': self.card_sort_categories,
        }

    survey_id     =   Column(String, primary_key=True)
    task_group_name = Column(String, primary_key=True)
    task_id       =   Column(Integer, primary_key=True)
    name          =   Column(String)
    question   =   Column(String)
    type       =   Column(Integer)
    answer_variants = Column(ARRAY(String))
    tree        = Column(String)
    true_answer = Column(String)
    true_route = Column(ARRAY(String))
    card_sort_type = Column(Integer)
    card_sort_values = Column(ARRAY(String))
    card_sort_categories = Column(ARRAY(String))
