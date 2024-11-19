import { AnswerGroup } from "./answer-group";

export class Response {
    id: string = '';
    surveyId: string = '';
    dateCreated: Date = new Date();
    timeSpentSeconds: number = 0;
    answerGroups: AnswerGroup[] = [];

    toJSON() {
        return {
            "survey_id": this.surveyId,
            "date_created": this.dateCreated,
            "time_spent_seconds": this.timeSpentSeconds,
            "answer_groups": this.answerGroups.map(a => a.toJSON())
        }
    }
}
