import { Column } from "./column";

export class Board {
    columns: Column[];

    constructor(columns: Column[] = [new Column('values')]) {
        this.columns = columns;
    }

    initialize(data) {
        this.columns = data.columns;
    }
}