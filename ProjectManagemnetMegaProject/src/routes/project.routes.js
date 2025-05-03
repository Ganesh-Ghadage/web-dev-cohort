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

const router = Router();

router
  .route("/")
  .post(authenticateUser, createProjectValidator(), validate, createProject)
  .get(authenticateUser, getProjects);

router
  .route('/:projectId')
  .get(authenticateUser, projectIdParamsValidator(), validate, getProjectById)
  .post(authenticateUser, updatedProjectValidator(), validate, updateProject)
  .delete(authenticateUser, projectIdParamsValidator(), validate, deleteProject)

router
  .route('/:projectId/add-member')
  .post(authenticateUser, addMemberToProjectValidator(), validate, addMemberToProject)
export default router;
