import { Router } from "express";
import authenticateUser from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validator.middleware.js";
import { createProjectValidator } from "../validators/project.validators.js";
import {
  createProject,
  getProjects,
} from "../controllers/project.controllers.js";

const router = Router();

router
  .route("/create-project")
  .post(authenticateUser, createProjectValidator(), validate, createProject);

router
  .route("/get-all-projects")
  .get(authenticateUser, getProjects);

export default router;
