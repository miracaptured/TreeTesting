export class Column {
    name: string;
    values: string[];

    constructor(name: string, values: string[] = []) {
        this.name = name;
        this.values = values;
    }
}