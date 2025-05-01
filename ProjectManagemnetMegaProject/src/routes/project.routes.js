import { Router } from "express";
import authenticateUser from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validator.middleware.js";
import { createProjectValidator } from "../validators/project.validators.js";
import { createProject } from "../controllers/project.controllers.js";

const router = Router();

router
  .route("/create-project")
  .post(authenticateUser, createProjectValidator(), validate, createProject);

export default router;
