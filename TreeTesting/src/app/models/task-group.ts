import { Task, TaskWithAnswers } from "./task";

export abstract class TaskGroupBase {
    name: string;

    constructor(name) {
        this.name = name;
    }
}

export class TaskGroup extends TaskGroupBase {
    tasks: Task[] = [];

    toJSON = () => new Object({
        "name": this.name,
        "tasks": this.tasks.map(task => task.toJSON()),
    });
}

export class TaskGroupWithAnswers extends TaskGroupBase {
    tasks: TaskWithAnswers[] = [];
}
