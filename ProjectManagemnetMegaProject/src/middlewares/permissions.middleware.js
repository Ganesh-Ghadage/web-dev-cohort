import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

const checkUserPermission = (roles = []) =>
  asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;
    const userId = req.user._id;

    if (!projectId) {
      throw new ApiError(404, "Project Id not found");
    }

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

    const projectMember = await ProjectMember.findOne({
      user: new mongoose.Types.ObjectId(userId),
      project: new mongoose.Types.ObjectId(projectId),
    });

    if (!projectMember) {
      throw new ApiError(400, "Project member creation failed");
    }

    const givenRole = projectMember.role;

    req.user.role = givenRole;

    if (!roles.includes(givenRole)) {
      throw new ApiError(403, "You are not allowed to perform this task");
    }
});

export { checkUserPermission };
