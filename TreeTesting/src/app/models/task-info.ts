import { TaskType } from "./task-type"

export class TaskInfo {
    taskType: TaskType;
    taskName: string;
    taskDescription: string;
}

export class VariantDistribution {
    variant: string;
    percent: number;
}

export class TextDistribution {
    text: string;
    count: number;
}

export class TextTaskInfo extends TaskInfo {
    popularAnswers: TextDistribution[];
}

export class VariantTaskInfo extends TaskInfo {
    override taskType: TaskType = TaskType.VariantTask;
    trueAnswer: string;
    percentTrue: number;
    percentByVariant: VariantDistribution[];
}

export class CardSortTaskInfo extends TaskInfo {
    override taskType : TaskType = TaskType.CardSort;
    categories: string[];
    values: string[];
    distribution: number[][];
    dendrogramData: any;
    matchTableData: number[][];
}

export class TreeTestingTaskInfo extends TaskInfo {
    override taskType : TaskType = TaskType.TreeTesting;
    directSuccessPercent: number;
    indirectSuccessPercent: number;
    failPercent: number;
    directnessPercent: number;
    totalRoutes: number;
    trueRoute: string[];
    percentTimeOut3Std: number;
    percentTimeBetween23Std: number;
    percentTimeBetween12Std: number;
    percentTimeInside1Std: number;
    treeGrade: number;
}
