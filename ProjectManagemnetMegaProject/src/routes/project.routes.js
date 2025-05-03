import { Router } from "express";
import authenticateUser from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validator.middleware.js";
import { addMemberToProjectValidator, createProjectValidator, projectIdParamsValidator, updatedProjectValidator } from "../validators/project.validators.js";
import {
  addMemberToProject,
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../controllers/project.controllers.js";
import { checkUserPermission } from "../middlewares/permissions.middleware.js";
import { userRoleEnums } from "../utils/constants.js";

const router = Router();

router
  .route("/")
  .post(authenticateUser, createProjectValidator(), validate, createProject)
  .get(authenticateUser, getProjects);

router
  .route('/:projectId')
  .get(authenticateUser, checkUserPermission([userRoleEnums.ADMIN, userRoleEnums.PROJECT_ADMIN, userRoleEnums.MEMBER]), projectIdParamsValidator(), validate, getProjectById)
  .post(authenticateUser, checkUserPermission([userRoleEnums.ADMIN, userRoleEnums.PROJECT_ADMIN]), updatedProjectValidator(), validate, updateProject)
  .delete(authenticateUser, checkUserPermission([userRoleEnums.ADMIN, userRoleEnums.PROJECT_ADMIN]), projectIdParamsValidator(), validate, deleteProject)

router
  .route('/:projectId/member')
  .post(authenticateUser, checkUserPermission([userRoleEnums.ADMIN, userRoleEnums.PROJECT_ADMIN]), addMemberToProjectValidator(), validate, addMemberToProject)
export default router;
