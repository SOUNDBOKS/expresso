export class ExpressoError extends Error {
    error: string
    cause?: string
    extra?: object;

    constructor(error: string, cause?: string, extra?: object) {
        super(error + ": " + cause)
        this.error = error
        this.cause = cause
        this.extra = extra

        Object.setPrototypeOf(this, ExpressoError.prototype)
    }
}

export class RequestError extends Error {
    error: string
    cause?: string
    extra?: object;

    constructor(error: string, cause?: string, extra?: object) {
        super(error + ": " + cause)
        this.error = error
        this.cause = cause
        this.extra = extra

        Object.setPrototypeOf(this, RequestError.prototype)
    }
}