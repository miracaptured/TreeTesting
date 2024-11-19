import { Answer } from "./answer";
import { Tree } from "./tree";

export class Task {
    taskGroup: string;
    type: number = 0;
    name: string = '';
    question: string = '';
    answerVariants: string[] = ['', ''];
    tree: Tree = new Tree({});
    trueAnswer: string = '';
    trueRoute: string[] = [];
    cardSortValues: string[] = [];
    cardSortCategories: string[] = [];
    cardSortType: number = 0;

    toJSON() {
        return {
            "task_group": this.taskGroup,
            "type": this.type,
            "name": this.name,
            "question": this.question,
            "answer_variants": this.answerVariants,
            "tree": JSON.stringify(this.tree.toJson()),
            "true_answer": this.trueAnswer,
            "true_route": this.trueRoute,
            "card_sort_categories": this.cardSortCategories,
            "card_sort_values": this.cardSortValues,
            "card_sort_type": this.cardSortType,
        }
    }
}

export class TaskWithAnswers extends Task {
    answers: Answer[] = [];
}
