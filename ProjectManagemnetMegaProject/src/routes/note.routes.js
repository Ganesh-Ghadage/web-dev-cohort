import { Router } from "express";
import authenticateUser from "../middlewares/auth.middleware.js";
import { createNote, getNotes } from "../controllers/note.controllers.js";
import { createNoteValidator } from "../validators/note.validators.js";
import validate from "../middlewares/validator.middleware.js";

const router = Router();

router
  .route("/create-note")
  .post(authenticateUser, createNoteValidator(), validate, createNote);

router.route("/get-all-notes").get(authenticateUser, getNotes);

export default router;
