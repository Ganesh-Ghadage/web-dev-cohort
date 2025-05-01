import { Router } from "express"
import authenticateUser from "../middlewares/auth.middleware.js";
import { getNotes } from "../controllers/note.controllers.js";

const router = Router()

router.route('/get-all-notes').get(
  authenticateUser,
  getNotes
)

export default router