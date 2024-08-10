import { CustomAPIError } from "../errors/custom-error.js";

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg : err.message })
    }
    console.error(err)
    return res.status(500).json("Something went wrong, please try again")
}

export default errorHandlerMiddleware