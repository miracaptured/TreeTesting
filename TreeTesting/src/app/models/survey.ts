import { TaskGroup, TaskGroupWithAnswers } from "./task-group";

export abstract class SurveyBase {
    id: string;
    name: string = '';
    creatorId: number;
    dateCreated: Date = new Date();
    description: string = '';
}

export class Survey extends SurveyBase {
    taskGroups: TaskGroup[] = [];

    toJSON() {
        return {
            "name": this.name,
            "creator_id": this.creatorId,
            "date_created": this.dateCreated.toLocaleString(),
            "task_groups": this.taskGroups.map(taskGroup => taskGroup.toJSON()),
            "description": this.description,
        }
    }

    toJSONExtended() {
        return {
            "survey_id": this.id,
            "name": this.name,
            "creator_id": this.creatorId,
            "date_created": this.dateCreated.toLocaleString(),
            "task_groups": this.taskGroups.map(taskGroup => taskGroup.toJSON()),
            "description": this.description,
        }
    }
}

export class SurveyWithAnswers extends SurveyBase {
    taskGroups: TaskGroupWithAnswers[] = [];
}
