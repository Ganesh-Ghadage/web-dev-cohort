import { Router } from "express";
import authenticateUser from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validator.middleware.js";
import { createProjectValidator, projectIdParamsValidator, updatedProjectValidator } from "../validators/project.validators.js";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../controllers/project.controllers.js";

const router = Router();

router
  .route("/create-project")
  .post(authenticateUser, createProjectValidator(), validate, createProject);

router
  .route("/get-all-projects")
  .get(authenticateUser, getProjects);

router
  .route('/get-project/:id')
  .get(authenticateUser, projectIdParamsValidator(), validate, getProjectById)

router
  .route('/update-project/:id')
  .post(authenticateUser, updatedProjectValidator(), validate, updateProject)

router
  .route('/delete-project/:id')
  .delete(authenticateUser, projectIdParamsValidator(), validate, deleteProject)


export default router;
