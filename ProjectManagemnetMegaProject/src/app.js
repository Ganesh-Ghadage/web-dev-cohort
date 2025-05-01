import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errors.middleware.js";

import healthCheckRouter from "./routes/healthcheck.routes.js";
import userRouter from "./routes/auth.routes.js";
import noteRouter from "./routes/note.routes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CROS_ORIGIN,
    credentials: true,
    methods: ["PUT", "UPDATE", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.static("public"));

app.use("/api/v1/healthCheck", healthCheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projectNotes", noteRouter);

// error handling middleware, PS: It should be at last to handle all errors
app.use(errorHandler);

export default app;
