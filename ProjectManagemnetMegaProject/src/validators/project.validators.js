import { body, param } from "express-validator";
import { avaliableUserRoles } from "../utils/constants.js";

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

const projectIdParamsValidator = () => {
  return [
    param("id")
      .trim()
      .notEmpty().withMessage("Project id is required")
      .isMongoId().withMessage("Invalid mongo Id")
  ]
}

const updatedProjectValidator = () => {
  return [
    projectIdParamsValidator(),
    createProjectValidator()
  ]
}

const addMemberToProjectValidator = () => {
  return [
    param("projectId")
      .trim()
      .notEmpty().withMessage("Project id is required")
      .isMongoId().withMessage("Invalid mongo Id"),
    body("userId")
      .trim()
      .notEmpty().withMessage("User id is required")
      .isMongoId().withMessage("Invalid mongo Id"),
    body("role")
      .trim()
      .notEmpty().withMessage("User role is required")
      .isIn(avaliableUserRoles)
  ]
}

export {
  createProjectValidator,
  projectIdParamsValidator,
  updatedProjectValidator,
  addMemberToProjectValidator
}