import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";

const validate = (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    return next();
  }

  // console.log(error)

  const extractedErrors = [];
  error.array().map((err) => {
    extractedErrors.push({
      [err.path]: err.msg,
    });
  });

  // console.log(extractedErrors)

  throw new ApiError(422, "Data is not valid", extractedErrors);
};

export default validate;
