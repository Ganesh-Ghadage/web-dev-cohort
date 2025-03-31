import mongoose, { Schema } from "mongoose"

const projectSchema = new Schema(
    {
        name: {
            type: String,
            requird: true,
            trim: true,
            unique: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
            maxLength: 300
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    }, 
    {
        timestamps: true
    }
)

export const Project = mongoose.model('Project', projectSchema)

