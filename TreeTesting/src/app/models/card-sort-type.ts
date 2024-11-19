export enum CardSortType {
    Open = 0,
    Hybrid = 1,
    Closed = 2
}

export namespace CardSortType {
    export function keys(): Array<string>{
        var keys = Object.keys(CardSortType);
        return keys.slice(keys.length / 2 - 1, keys.length - 3);
    }

    export function values(): Array<number>{
        var values = Object.values(CardSortType);
        return values.slice(values.length / 2 - 1, values.length - 3).map(v => v as number);
    }

    export function toString(type) {
        switch (type) {
            case CardSortType.Open: return "tasks.cardsort.types.open";
            case CardSortType.Hybrid: return "tasks.cardsort.types.hybrid";
            case CardSortType.Closed: return "tasks.cardsort.types.closed";
        }

        throw new Error;
    };
}
