export class FailedOnGeneratingResponseError extends Error {
    private _statusCode = 422;

    get statusCode() {
        return this._statusCode;
    }

    constructor() {
        super("Failed on generating response");
    }
}