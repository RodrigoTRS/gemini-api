export class ResourceNotFoundError extends Error {
    private _statusCode = 404;

    get statusCode() {
        return this._statusCode;
    }

    constructor() {
        super("Resource not found error");
    }
}