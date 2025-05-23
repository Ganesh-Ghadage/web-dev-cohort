import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponce } from "../utils/api-responce.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import {
  deleteFromCloudinary,
  upolodOnClodinary,
} from "../utils/cloudinary.js";
import fs from "fs";
import { sendForgotPasswordMail, sendVerifyMail } from "../utils/mail.js";
import crypto from "crypto";
import { cookieOptions } from "../utils/constants.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateAccessAndRefreshToken = async (userId) => {
  if (!userId) return null;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(406, "User ID does not exits");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, fullname, role } = req.body;

  const avatarLoacalPath = req.file?.path;

  if (!avatarLoacalPath) {
    throw new ApiError(404, "Avatar Image not found");
  }

  // check if user already exists or not
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(406, "User is already registered");
  }

  // upload avatar image to cloudinary
  let avatar;
  try {
    avatar = await upolodOnClodinary(avatarLoacalPath);
  } catch (error) {
    throw new ApiError(500, "Image upload on clodinary failed", error);
  }

  try {
    const createdUser = await User.create({
      email,
      password,
      username: username.toLowerCase(),
      fullname: fullname,
      avatar: {
        url: avatar.url,
        localPath: "",
      },
      // role,
    });

    // generate email verification token
    const { unHashedToken, hashedToken, tokenExpiry } =
      await createdUser.generateEmailToken();

    createdUser.emailVerificationToken = hashedToken;
    createdUser.emailVerificationExpiry = tokenExpiry;
    await createdUser.save();

    const user = await User.findById(createdUser._id).select(
      "-password -refreshTooken",
    );

    if (!user) {
      throw new ApiError(500, "User not registered");
    }

    // send emilaVerificationToken to user
    await sendVerifyMail(username, email, unHashedToken);

    return res
      .status(201)
      .json(new ApiResponce(201, user, "User registered sucessfully"));
  } catch (error) {
    console.log("error", error);

    if (avatar) {
      await deleteFromCloudinary(avatar.url);
    }

    if (avatarLoacalPath && !avatar) {
      fs.unlinkSync(avatarLoacalPath);
    }

    throw new ApiError(500, "Someting went wron while registering user", error);
  }
});

const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({ emailVerificationToken: hashedToken });

  if (!user) {
    throw new ApiError(404, "Invalid token");
  }

  if (user.emailVerificationExpiry <= Date.now()) {
    throw new ApiError(408, "Verification token expired");
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;

  await user.save();

  return res.status(200).json(
    new ApiResponce(
      200,
      {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
      "User verified successfully",
    ),
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const isPasswordValid = await user.isPasswordValid(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  if (!accessToken || !refreshToken) {
    throw new ApiError(501, "Tokens generation failed");
  }

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!loggedInUser) {
    throw new ApiError(500, "Something went wrong, User not logged");
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponce(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully",
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(401, "Unauthorized request");
  }

  const loggedOutUser = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    },
  ).select("-password");

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponce(200, loggedOutUser, "User logged out successfully"));
});

const getUserProfile = asyncHandler((req, res) => {
  res
    .status(200)
    .json(new ApiResponce(200, req?.user, "User profile fetched successfully"));
});

const refreshAccessTonken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedRefreshToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await User.findById(decodedRefreshToken._id);

    if (!user) {
      throw new ApiError(404, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(406, "Invalid Refresh token");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id,
    );

    if (!accessToken || !refreshToken) {
      throw new ApiError(502, "Tokens generation failed");
    }

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponce(
          200,
          {
            user,
            accessToken,
            refreshToken,
          },
          "Access token refreshed",
        ),
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong, tokens not refreshed",
      error,
    );
  }
});

const resendEmailVerification = asyncHandler(async (req, res) => {
  const { _id, email, username } = req.user;

  try {
    const user = await User.findById(_id).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.isEmailVerified) {
      throw new ApiError(400, "User already verified");
    }

    const { unHashedToken, hashedToken, tokenExpiry } = user.generateEmailToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;
    await user.save();

    await sendVerifyMail(username, email, unHashedToken);

    return res
      .status(200)
      .json(new ApiResponce(200, user, "Verification mail sent successfully"));
  } catch (error) {
    console.error("Error:", error);

    throw new ApiError(
      error?.statusCode || 500,
      error?.message ||
        "Someting went wrong while generating verification mail",
      error,
    );
  }
});

const resetForgottenPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({ forgotPasswordToken: hashedToken });

    if (!user) {
      throw new ApiError(404, "Invalid token");
    }

    if (user.forgotPasswordExpiry <= Date.now()) {
      throw new ApiError(406, "Password reset token expired");
    }

    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    user.password = newPassword;

    await user.save();

    return res
      .status(200)
      .json(new ApiResponce(200, {}, "Password changed successfully"));
  } catch (error) {
    console.error("Error:", error);

    throw new ApiError(
      error?.statusCode || 500,
      error?.message || "Someting went wrong while reseting password",
      error,
    );
  }
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email, username } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const { unHashedToken, hashedToken, tokenExpiry } = user.generateEmailToken();

    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordExpiry = tokenExpiry;
    await user.save();

    await sendForgotPasswordMail(username, email || user.email, unHashedToken);

    return res
      .status(200)
      .json(
        new ApiResponce(200, user, "Password reset mail sent successfully"),
      );
  } catch (error) {
    console.error("Error:", error);

    throw new ApiError(
      error?.statusCode || 500,
      error?.message || "Someting went wrong while sending password reset mail",
      error,
    );
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { email, username, newPassword, oldPassword } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      throw new ApiError(401, "Invalid user credentials");
    }

    const isPasswordValid = await user.isPasswordValid(oldPassword);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }

    user.password = newPassword.trim();
    await user.save();

    return res
      .status(200)
      .json(new ApiResponce(200, {}, "User Password updated successfully"));
  } catch (error) {
    console.error("Something went wrong while updating password - ", error);

    throw new ApiError(
      error?.statusCode || 500,
      error?.message || "Something went wrong while updating password",
      error,
    );
  }
});

export {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  getUserProfile,
  refreshAccessTonken,
  resendEmailVerification,
  resetForgottenPassword,
  forgotPasswordRequest,
  changeCurrentPassword,
};