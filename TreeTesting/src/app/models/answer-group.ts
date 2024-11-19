import { Answer } from "./answer";

export class AnswerGroup {
    taskGroupName: string;
    answers: Answer[] = [];
    timeSpentSeconds: number;

    constructor(taskGroupName, timeSpentSeconds, answers = []) {
        this.taskGroupName = taskGroupName;
        this.answers = answers;
        this.timeSpentSeconds = timeSpentSeconds;
    }

    toJSON = () => new Object({
        "name": this.taskGroupName,
        "answers": this.answers.map(answer => answer.toJSON()),
        "time_spent_seconds": this.timeSpentSeconds
    });
}