import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const error = validationResult(req)

  console.log(error)

  next()
}

export default validate