from typing import Union
from pydantic import BaseModel

class VariantDistribution(BaseModel):
    variant: str
    percent: int

class TextDistribution(BaseModel):
    text: str
    count: int

class DendrogramData(BaseModel):
    icoord: list
    dcoord: list
    ivl: list[str]
    leaves: list

class TaskInfo(BaseModel):
    task_group: str
    task_type: int
    task_name: str
    task_description: str
    
    def toJSON(self):
        return {
            "taskGroup": self.task_group,
            "taskType": self.task_type,
            "taskName": self.task_name,
            "taskDescription": self.task_description,
        }
    

class TextTaskInfo(TaskInfo):
    popular_answers: list[TextDistribution]
    
    def toJSON(self):
        return {
            "taskGroup": self.task_group,
            "taskType": self.task_type,
            "taskName": self.task_name,
            "taskDescription": self.task_description,
            "popularAnswers": self.popular_answers,
        }

class VariantTaskInfo(TaskInfo):
    true_answer: str
    percent_true: int
    percent_by_variant: list[VariantDistribution]
    
    def toJSON(self):
        return {
            "taskGroup": self.task_group,
            "taskType": self.task_type,
            "taskName": self.task_name,
            "taskDescription": self.task_description,
            "trueAnswer": self.true_answer,
            "percentTrue": self.percent_true,
            "percentByVariant": self.percent_by_variant
        }

class CardSortTaskInfo(TaskInfo):
    categories: list[str]
    values: list[str]
    distribution: list[list[int]]
    dendrogram_data: dict
    match_table_data: list[list[int]]
    
    def toJSON(self):
        return {
            "taskGroup": self.task_group,
            "taskType": self.task_type,
            "taskName": self.task_name,
            "taskDescription": self.task_description,
            "categories": self.categories,
            "values": self.values,
            "distribution": self.distribution,
            "dendrogramData": self.dendrogram_data,
            "matchTableData": self.match_table_data
        }

class TreeTestingTaskInfo(TaskInfo):
    directness_percent: int
    direct_success_percent: int
    indirect_success_percent: int
    fail_percent: int
    true_route: list[str]
    total_routes: int
    percent_time_out_3std: int
    percent_time_between_23std: int
    percent_time_between_12std: int
    percent_time_inside_1std: int
    tree_grade: int


    def toJSON(self):
        return {
            "taskGroup": self.task_group,
            "taskType": self.task_type,
            "taskName": self.task_name,
            "taskDescription": self.task_description,
            "trueRoute": self.true_route,
            "directnessPercent": self.directness_percent,
            "directSuccessPercent": self.direct_success_percent,
            "indirectSuccessPercent": self.indirect_success_percent,
            "failPercent": self.fail_percent,
            "totalRoutes": self.total_routes,
            "percentTimeOut3Std": self.percent_time_out_3std,
            "percentTimeBetween23Std": self.percent_time_between_23std,
            "percentTimeBetween12Std": self.percent_time_between_12std,
            "percentTimeInside1Std": self.percent_time_inside_1std,
            "treeGrade": self.tree_grade
        }
