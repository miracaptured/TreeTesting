import { Board } from "./board";

export class Answer {
    responseId: string;
    answerGroup: string;
    taskId: number;
    text: string;
    clickTrace: string[];
    board: Board;

    constructor(answerGroup: string = '', taskId = 0, text = '', clickTrace = [], board = new Board) {
        this.answerGroup = answerGroup;
        this.taskId = taskId;
        this.text = text;
        this.clickTrace = clickTrace;
        this.board = board;
    }

    toJSON() {
        return {
            "answer_group": this.answerGroup,
            "task_id": this.taskId,
            "text": this.text,
            "click_trace": this.clickTrace,
            "board": JSON.stringify(this.board),
        }
    }
}
