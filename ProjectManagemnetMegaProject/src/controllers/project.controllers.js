import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponce } from "../utils/api-responce.js";
import { ApiError } from "../utils/api-error.js";
import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { User } from "../models/user.models.js";
import mongoose from "mongoose";

const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const project = await Project.findOne({
    name,
  });

  if (project) {
    throw new ApiError(400, `Project with ${name} already exits`);
  }

  const createdProject = await Project.create({
    name,
    description,
    createdBy: req.user._id,
  });

  if (!createdProject) {
    throw new ApiError(400, "Project creation failed");
  }

  return res
    .status(201)
    .json(new ApiResponce(200, createdProject, "Project created successfully"));
});

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();

  if (!projects) {
    throw new ApiError(404, "Projects not found");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, projects, "All projects fetched successfully"));
});

const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById({
    _id: new mongoose.Types.ObjectId(projectId)
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, project, "Project fetched successfully"));
});

const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { name, description } = req.body;

  const project = await Project.findById({
    _id: new mongoose.Types.ObjectId(projectId)
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const updatedProject = await Project.findByIdAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(projectId),
    },
    {
      name,
      description,
    },
    {
      new: true,
    },
  );

  return res
    .status(200)
    .json(new ApiResponce(200, updatedProject, "Project updated sccessfully"));
});

const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById({
    _id: new mongoose.Types.ObjectId(projectId)
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  await Project.findByIdAndDelete({
    _id: new mongoose.Types.ObjectId(projectId)
  });

  return res
    .status(200)
    .json(new ApiResponce(200, {}, "Project deleted sccessfully"));
});

const getProjectMembers = asyncHandler(async (req, res) => {
  // get project members
});

const addMemberToProject = asyncHandler(async (req, res) => {
  const { userId, role } = req.body;
  const { projectId } = req.params;

  const user = await User.findById({
    _id: new mongoose.Types.ObjectId(userId),
  });

  if (!user) {
    throw new ApiError(404, "User doesn't exists");
  }

  const project = await Project.findById({
    _id: new mongoose.Types.ObjectId(projectId),
  });

  if (!project) {
    throw new ApiError(404, "Project doesn't exists");
  }

  const projectMember = await ProjectMember.create({
    user: user._id,
    project: project._id,
    role,
  });

  if (!projectMember) {
    throw new ApiError(400, "Project member creation failed");
  }

  return res
    .status(201)
    .json(
      new ApiResponce(
        201,
        projectMember,
        `${user.name} has been added in ${project.name} as ${role}`,
      ),
    );
});

const deleteMember = asyncHandler(async (req, res) => {
  // delete member from project
});

const updateMemberRole = asyncHandler(async (req, res) => {
  // update member role
});

export {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMemberRole,
  updateProject,
};
