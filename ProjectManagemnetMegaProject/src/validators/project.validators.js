import { body } from "express-validator";

const createProjectValidator = () => {
  return [
    body("name")
      .trim()
      .notEmpty().withMessage("Project name is required"),
    body("description")
      .trim()
      .notEmpty().withMessage("Project description is required")
      .isLength({ max: 250 }).withMessage("Description should not exceed more than 250 charcters"),
  ];
};

export {
  createProjectValidator
}