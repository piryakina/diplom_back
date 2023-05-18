import ApiException from "../lib/api.exception.js"

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err)
    if(err instanceof ApiException) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: 'Непредвиденная ошибка'})
}

export default errorHandlerMiddleware
