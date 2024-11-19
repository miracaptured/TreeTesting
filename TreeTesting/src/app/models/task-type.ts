export enum TaskType {
    TextQuestion = 0,
    VariantTask = 1,
    CardSort = 2,
    TreeTesting = 3
}

export namespace TaskType {
    export function keys(): Array<string>{
        var keys = Object.keys(TaskType);
        return keys.slice(keys.length / 2 - 1, keys.length - 3);
    }

    export function values(): Array<number>{
        var values = Object.values(TaskType);
        return values.slice(values.length / 2 - 1, values.length - 3).map(v => v as number);
    }

    export function toString(type) {
        switch (type) {
            case TaskType.TextQuestion: return "tasks.types.text";
            case TaskType.VariantTask: return "tasks.types.variant";
            case TaskType.CardSort: return "tasks.types.cardSort";
            case TaskType.TreeTesting: return "tasks.types.treeTesting";
        }

        throw new Error;
    };
}