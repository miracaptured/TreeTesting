import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { Survey, SurveyWithAnswers } from '../models/survey';
import { UserService } from './user.service';
import { Task, TaskWithAnswers } from '../models/task';
import { Response } from 'src/app/models/response';
import { Answer } from '../models/answer';
import { TaskGroup, TaskGroupWithAnswers } from '../models/task-group';
import { AnswerGroup } from '../models/answer-group';
import { Board } from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private _api : ApiService, private _auth : AuthService) {
  }

  jsonToSurvey(survey) {
    let result = new Survey();
    result.id = survey.survey_id;
    result.creatorId = survey.creator_id;
    result.dateCreated = survey.date_created;
    result.name = survey.name;
    result.description = survey.description;
    result.taskGroups = survey.task_groups.map(inputGroup => {
      let resultGroup = new TaskGroup(inputGroup.name);
      resultGroup.tasks = inputGroup.tasks.map(task => {
        let res = new Task();
        res.name = task.name;
        res.question = task.question;
        res.answerVariants = task.answer_variants
        res.type = task.type;
        res.tree.initialize(JSON.parse(task.tree));
        res.trueAnswer = task.true_answer;
        res.trueRoute = task.true_route;
        res.cardSortCategories = task.card_sort_categories;
        res.cardSortValues = task.card_sort_values;
        res.cardSortType = task.card_sort_type;
        return res;
      });

      return resultGroup;
    })

    return result;
  }

  jsonToSurveyWithAnswers(survey) {
    let result = new SurveyWithAnswers();
    result.id = survey.survey_id;
    result.name = survey.name;
    result.description = survey.description;
    result.taskGroups = survey.task_groups.map(inputGroup => {
      let resultGroup = new TaskGroupWithAnswers(inputGroup.name);
      resultGroup.tasks = inputGroup.tasks.map(inputTask => {
        let resultTask = new TaskWithAnswers();
        resultTask.name = inputTask.name;
        resultTask.question = inputTask.question;
        resultTask.answerVariants = inputTask.answer_variants;
        resultTask.type = inputTask.type;
        resultTask.tree.initialize(JSON.parse(inputTask.tree));
        resultTask.trueAnswer = inputTask.true_answer;
        resultTask.trueRoute = inputTask.true_route;
        resultTask.cardSortCategories = inputTask.card_sort_categories;
        resultTask.cardSortValues = inputTask.card_sort_values;
        resultTask.cardSortType = inputTask.card_sort_type;
        resultTask.answers = inputTask.answers.map(inputAnswer => {
          let resultAnswer = new Answer();
          resultAnswer.responseId = inputAnswer.response_id;
          resultAnswer.taskId = inputAnswer.task_id;
          resultAnswer.text = inputAnswer.text;
          resultAnswer.clickTrace = inputAnswer.click_trace;
          resultAnswer.board = JSON.parse(inputAnswer.board) as Board;
          return resultAnswer;
        });
        return resultTask;
      });
      return resultGroup;
    });
    return result;
  }

  jsonToResponse(response) {
    let result = new Response();
    result.id = response.response_id;
    result.surveyId = response.survey_id;
    result.dateCreated = response.date_created;
    result.timeSpentSeconds = response.time_spent_seconds;
    result.answerGroups = response.answer_groups.map(inputGroup => {
      let resultGroup = new AnswerGroup(inputGroup.task_group_name, inputGroup.time_spent_seconds);
      resultGroup.answers = inputGroup.answers.map(answer => {
        let res = new Answer();
        res.taskId = answer.task_id;
        res.text = answer.answer_text;
        res.clickTrace = answer.tree_trace;

        return res;
      });

      return resultGroup;
    });

    return result;
  }

  createSurvey(survey) {
    let b = survey.toJSON();
    return this._api.postTypeRequest('survey', b);
  }

  getSurveyById(id) {
    return this._api.getTypeRequest(`survey/${id}`);
  }

  getSurveysList() {
    return this._api.getTypeRequest(`survey/user/${UserService.CurrentUser.id}`);
  }

  addResponse(response) {
    let b = response.toJSON();
    return this._api.postTypeRequest(`survey/response/${response.surveyId}`, b);
  }

  getSurveyWithAnswersById(id) {
    return this._api.getTypeRequest(`survey/${id}/answers`);
  }

  deleteSurvey(id) {
    return this._api.deleteTypeRequest(`survey/${id}`);
  }

  updateSurvey(survey) {
    let b = survey.toJSONExtended();
    return this._api.postTypeRequest(`survey/${survey.id}`, b);
  }
}
