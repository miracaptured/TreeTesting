from statistics import fmean
from collections import Counter
from models.db import Task, Answer, AnswerGroup, TaskGroup
from dataaccess.storages import survey_storage, task_storage, response_storage, answer_storage
from models.service import\
    TextDistribution,\
    TextTaskInfo,\
    VariantDistribution,\
    VariantTaskInfo,\
    CardSortTaskInfo,\
    TreeTestingTaskInfo,\
    AnalyticsReportSchema,\
    AnalyticsReportExtendedSchema,\
    Board,\
    AnswerGroupSchema
from scipy.cluster.hierarchy import linkage, dendrogram
from scipy.stats import norm
import matplotlib.pyplot as plt
import matplotlib.colors as colors
import matplotlib
import numpy as np
from pathlib import Path

def get_task_info(survey_id, task_group_name, task_id) -> tuple[Task, Answer]:
    task = task_storage.get_task(survey_id, task_group_name, task_id)
    answers = [answer for answer in answer_storage.get_answers_by_group(survey_id, task_group_name) if answer.task_id == task_id]

    return task, answers


def get_answers_by_task(survey_id, task_group_name, task_id):
    return [answer for answer in answer_storage.get_answers_by_group(survey_id, task_group_name) if answer.task_id == task_id]


def get_text_task_info(survey_id, task):
    answers = get_answers_by_task(survey_id, task.task_group_name, task.task_id)
    answers_texts = [answer.answer_text for answer in answers]
    most_frequent = [TextDistribution(text=value, count=count) for value, count in Counter(answers_texts).most_common(5)]

    return TextTaskInfo(task_type=0,
                        task_group=task.task_group_name,
                        task_name=task.name,
                        task_description=task.question,
                        popular_answers=most_frequent)


def get_variant_task_info(survey_id, task):
    answers = get_answers_by_task(survey_id, task.task_group_name, task.task_id)
    answers_texts = list(map(lambda answer: answer.answer_text, answers))
    counter = Counter(answers_texts)
    if not answers_texts:
        variant_distribution = list(map(lambda variant: VariantDistribution(variant=variant, percent=0), task.answer_variants))
        percent_true = 0
    else:
        variant_distribution = list(map(lambda variant: VariantDistribution(variant=variant, percent=counter[variant] / len(answers_texts) * 100), task.answer_variants))
        percent_true = counter[task.true_answer] / len(answers_texts) * 100

    return VariantTaskInfo(task_type=1,
                           task_group=task.task_group_name,
                           task_name=task.name,
                           task_description=task.question,
                           true_answer=task.true_answer,
                           percent_true=percent_true,
                           percent_by_variant=variant_distribution)

def get_card_sort_categories(task: Task, answers: list[Answer]):
    hash_table = dict()
    for cat in task.card_sort_categories:
        hash_table[cat] = dict()
    
    if task.card_sort_type < 2:
        for answer in answers:
            board = Board(answer.board)
            board.columns.pop(0)
            for column in board.columns:
                hash_table[column.name] = dict()

    return hash_table

def get_card_sort_distribution(task: Task, answers: list[Answer]):
    hash_table = get_card_sort_categories(task, answers)
    all_categories = hash_table.keys()
    matrix = [[0 for _ in range(len(task.card_sort_values))] for _ in range(len(hash_table))]
    

    all_columns = []
    for answer in answers:
        board = Board(answer.board)
        board.columns.pop(0)
        all_columns.extend(board.columns)

    for column in all_columns:
        for value in column.values:
            if (hash_table[column.name].get(value) is None):
                hash_table[column.name][value] = 1
            else:
                hash_table[column.name][value] += 1
    
    for category_index, category in enumerate(all_categories):
        for value, count in hash_table[category].items():
            val_index = task.card_sort_values.index(value)
            matrix[category_index][val_index] = count

    return matrix, list(all_categories)


def get_dendrogram_data(distribution, labels):
    matplotlib.rcParams['lines.linewidth'] = 0.5
    distribution = np.transpose(distribution)
    #distribution = 100 - distribution
    #condensed_distance_matrix = distribution[np.triu_indices(len(distribution), k=1)]
    #linked = linkage(condensed_distance_matrix, method='average')
    linked = linkage(distribution, method='average')
    linked = list(map(lambda t: list(map(lambda inner: inner + 0.5, t)), linked))
    dendro = dendrogram(linked, labels=labels, no_plot=True, count_sort='descending')
    dendro_data = {
        'icoord': dendro['icoord'],
        'dcoord': [[float(val) for val in group] for group in dendro['dcoord']],
        'ivl': dendro['ivl'],
        'leaves': dendro['leaves'],
    }
    
    return dendro_data


def get_match_table_data(task: Task, answers: list[Answer]):
    matrix = [[0 for _ in range(len(task.card_sort_values))] for _ in range(len(task.card_sort_values))]
    hash_table = dict()
    for val in task.card_sort_values:
        hash_table[val] = dict()

    all_columns = []
    for answer in answers:
        board = Board(answer.board)
        board.columns.pop(0)
        all_columns.extend(map(lambda col: col.values, board.columns))
    
    for value in task.card_sort_values:
        for column in all_columns:
            if value in column:
                for val in column:
                    if (hash_table[value].get(val) is None):
                        hash_table[value][val] = 1
                    else:
                        hash_table[value][val] += 1
    
    for value_index, value in enumerate(task.card_sort_values):
        for val, count in hash_table[value].items():
            val_index = task.card_sort_values.index(val)
            matrix[value_index][val_index] = count

    return matrix


def get_card_sort_task_info(survey_id, task: Task):
    answers = get_answers_by_task(survey_id, task.task_group_name, task.task_id)
    distribution, all_categories = get_card_sort_distribution(task, answers)
    dendrogram_data = get_dendrogram_data(distribution, task.card_sort_values)
    match_table_data = get_match_table_data(task, answers)
    

    return CardSortTaskInfo(task_type=2,
                            task_group=task.task_group_name,
                            task_name=task.name,
                            task_description=task.question,
                            categories=all_categories,
                            values=task.card_sort_values,
                            distribution=distribution,
                            dendrogram_data=dendrogram_data,
                            match_table_data=match_table_data)


def get_directness_percent(task, answers):
    if not answers: return 0

    return float(sum(1 if len(answer.tree_trace) == len(set(answer.tree_trace)) else 0 for answer in answers)) / len(answers) * 100


def get_trace_completion_percents(task, answers):
    if not answers: return 0

    indirect_success_percent = float(sum(1 if answer.tree_trace[-1] == task.true_route[-1] else 0 for answer in answers)) / len(answers) * 100
    fail_percent = 100 - indirect_success_percent
    direct_success_percent = float(sum(1 if answer.tree_trace == task.true_route else 0 for answer in answers)) / len(answers) * 100
    indirect_success_percent -= direct_success_percent

    return direct_success_percent, indirect_success_percent, fail_percent

def get_tree_structure_eval(survey_id, task_group):
    answer_groups = answer_storage.get_answer_groups_by_task_group(survey_id, task_group)

    time_spent_data = list(map(lambda answer_group: answer_group.time_spent_seconds, answer_groups))
    print(time_spent_data)
    mu, std = norm.fit(time_spent_data)
    print("mu, std: ", mu, std)
    std3 = std * 3
    std2 = std * 2
    out_3std = float(sum(el > mu+std3 or el < mu-std3 for el in time_spent_data))
    out_2std = float(sum(el > mu+std2 or el < mu-std2 for el in time_spent_data))
    out_1std = float(sum(el > mu+std or el < mu-std for el in time_spent_data))
    between_23std = out_2std - out_3std
    between_12std = out_1std - out_2std
    inside_1std = float(sum(el <= mu+std and el >= mu-std for el in time_spent_data))

    # - _3std / len
    # - _23std / len
    # + _12std / len
    # + _1std / len
    tree_grade = 3 + (\
        (inside_1std / len(answer_groups)) +\
        0.8*(between_12std / len(answer_groups)) -\
        0.8*(between_23std / len(answer_groups)) -\
        (out_3std / len(answer_groups))
    ) * 2



    return\
            tree_grade,\
            (out_3std / len(answer_groups)) * 100,\
            (between_23std / len(answer_groups)) * 100,\
            (between_12std / len(answer_groups)) * 100,\
            (inside_1std / len(answer_groups)) * 100

def get_tree_testing_task_info(survey_id, task):
    answers = get_answers_by_task(survey_id, task.task_group_name, task.task_id)
    answers = [answer for answer in answers if answer.tree_trace]

    direct_success_percent, indirect_success_percent, fail_percent = get_trace_completion_percents(task, answers)
    tree_grade, out_3std, between_23std, between_12std, inside_1std = get_tree_structure_eval(survey_id, task.task_group_name)

    return TreeTestingTaskInfo(task_type=3,
                               task_group=task.task_group_name,
                               task_name=task.name,
                               task_description=task.question,
                               true_route=task.true_route,
                               directness_percent=get_directness_percent(task, answers),
                               direct_success_percent=direct_success_percent,
                               indirect_success_percent=indirect_success_percent,
                               fail_percent=fail_percent,
                               total_routes=len(answers),
                               tree_grade=tree_grade,
                               percent_time_out_3std=out_3std,
                               percent_time_between_23std=between_23std,
                               percent_time_between_12std=between_12std,
                               percent_time_inside_1std=inside_1std)


def get_analytics_report(survey_id):
    survey = survey_storage.get_survey(survey_id)
    tasks = task_storage.get_tasks_by_survey(survey_id)
    responses = response_storage.get_responses_by_survey(survey_id)
    if not responses:
        avg_time = 0
        min_time = 0
        max_time = 0
    else:
        avg_time = fmean(map(lambda response: response.time_spent_seconds, responses))
        min_time = min(map(lambda response: response.time_spent_seconds, responses))
        max_time = max(map(lambda response: response.time_spent_seconds, responses))
    tasks_info = []
    for task in tasks:
        if task.type == 0: tasks_info.append(get_text_task_info(survey_id, task))
        elif task.type == 1: tasks_info.append(get_variant_task_info(survey_id, task))
        elif task.type == 2: tasks_info.append(get_card_sort_task_info(survey_id, task))
        elif task.type == 3: tasks_info.append(get_tree_testing_task_info(survey_id, task))
    
    return AnalyticsReportExtendedSchema(survey_id=survey_id,
                           survey_name=survey.name,
                           date_created=str(survey.date_created),
                           total_responses=len(responses),
                           average_time=avg_time,
                           min_time=min_time,
                           max_time=max_time,
                           tasks_info=tasks_info)


def get_reports_list(user_id):
    surveys = survey_storage.get_surveys_by_creator(user_id)
    reports = []
    for survey in surveys:
        responses_count = response_storage.count_responses_by_survey(survey.survey_id)
        reports.append(AnalyticsReportSchema(survey_id=survey.survey_id,
                                       survey_name=survey.name,
                                       date_created=str(survey.date_created),
                                       total_responses=responses_count))
    
    return reports


import xlsxwriter

def get_all_responses_file(survey_id):
    survey = survey_storage.get_survey(survey_id)
    tasks = task_storage.get_tasks_by_survey(survey_id)

    workbook_name = survey.name+"_responses.xlsx"
    workbook = xlsxwriter.Workbook(workbook_name)
    bold = workbook.add_format({'bold': True})

    for task in tasks:
        worksheet = workbook.add_worksheet(task.name)
        answer_groups = answer_storage.get_answer_groups_by_task_group(survey_id, task.task_group_name)
        answers = get_answers_by_task(survey_id, task.task_group_name, task.task_id)
        worksheet.write("A1", "RESPONSE ID", bold)
        worksheet.write("B1", "ANSWER VALUE", bold)
        worksheet.write("C1", "TIME SPENT (sec.)", bold)
        # response_id | answer value depending on task type | time spent in seconds
        row = 1
        for answer in answers:
            worksheet.write(row, 0, answer.response_id)

            # text task
            if task.type == 0:
                worksheet.write(row, 1, answer.answer_text)
            # variant task
            elif task.type == 1:
                worksheet.write(row, 1, answer.answer_text)
            # card sort
            elif task.type == 2:
                worksheet.write(row, 1, answer.board)
            # tree testing
            elif task.type == 3:
                worksheet.write(row, 1, ','.join(answer.tree_trace))
            
            worksheet.write(row, 2, (next(group for group in answer_groups if group.response_id == answer.response_id)).time_spent_seconds)

            row += 1

    workbook.close()

    with open(workbook_name, 'rb') as excel:
        lines = excel.read()

    Path.unlink(workbook_name, missing_ok=True)

    return lines