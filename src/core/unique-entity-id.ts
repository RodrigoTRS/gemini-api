import { randomUUID } from "crypto";

export class UniqueEntityId {

    private value: string;

    constructor(id?: string) {
        this.value = id ?? randomUUID();
    }

    toString() {
        return this.value;
    }

    toValue() {
        return this.value;
    }
}