import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponce } from "../utils/api-responce.js";
import { ApiError } from "../utils/api-error.js";
import { ProjectNote } from "../models/note.models.js";

const createNote = async (req, res) => {
  const { projectId, content } = req.body;

  const note = await ProjectNote.create({
    project: projectId,
    createdBy: req.user._id,
    content,
  });

  if (!note) {
    throw new ApiError(502, "Note creation failed");
  }

  return res
    .status(201)
    .json(new ApiResponce(201, note, "Note created successfully"));
};

const getNotes = asyncHandler(async (req, res) => {
  const notes = await ProjectNote.find();

  if (!notes) {
    throw new ApiError(404, "Notes not found");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, notes, "All notes fetched successfully"));
});

const getNoteById = async (req, res) => {
  const { id } = req.params;

  const notes = await ProjectNote.findById({
    id,
  });

  if (!notes) {
    throw new ApiError(404, "Notes not found");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, notes, "All notes fetched successfully"));
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const notes = await ProjectNote.findByIdAndUpdate(
    {
      id,
    },
    {
      content,
    },
    {
      new: true,
    },
  );

  if (!notes) {
    throw new ApiError(404, "Notes not found");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, notes, "All notes fetched successfully"));
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  const notes = await ProjectNote.findById({
    id,
  });

  if (!notes) {
    throw new ApiError(404, "Notes not found");
  }

  await ProjectNote.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponce(200, notes, "Notes deleted successfully"));
};

export { createNote, deleteNote, getNoteById, getNotes, updateNote };
