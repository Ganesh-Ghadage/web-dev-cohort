export const userRoleEnums = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project_admin",
    MEMBER: 'member'
}

export const avaliableUserRoles = Object.values(userRoleEnums)

export const taskStatusEnums = {
    TODO: "todo",
    IN_PROGRESS: "in_progress",
    DONE: "done"
}

export const avaliableTaskStatus = Object.values(taskStatusEnums)

export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
}