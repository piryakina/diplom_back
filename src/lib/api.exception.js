class ApiException extends Error {
    status
    errors

    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static BadGateway(message, errors = []) {
        return new ApiException(502, message, errors)
    }

    static BadRequest(message, errors = []) {
        return new ApiException(400, message, errors)
    }


}

export default ApiException
