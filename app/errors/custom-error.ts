class CustomAPIError extends Error {
    statusCode : number
    constructor(message, statusCode : number) {
        super(message)
        this.statusCode = statusCode
    }
}

function createCustomError(message, statusCode) {
    return new CustomAPIError(message, statusCode)
}

export { CustomAPIError, createCustomError }