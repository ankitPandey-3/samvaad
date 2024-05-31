import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  } else {
    return false;
  }
}

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const userSignup = async (req, res) => {
  const { fullName, username, email, password } = req.body;
  const ifExisted = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!ValidateEmail(email)) {
    return res.status(400).json(new ApiError(400, "Invalid Email ID"));
  }

  if (ifExisted) {
    return res.status(409).json(new ApiError(409, "User already existed"));
  }

  if (password.length < 8 || password.length > 14) {
    return res.status(400).json(new ApiError(400, "Invalid Password length"));
  }

  const user = await User.create({
    fullName,
    username,
    email,
    password,
  });

  await user.defaultProfileImage();

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -status -friendsList"
  );

  if (!createdUser) {
    return res
      .status(500)
      .json(
        new ApiError(500, "Something went wrong while registering the user")
      );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
};

const userSignin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json(new ApiError(404, "User does not exist"));
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json(new ApiError(401, "Invalid user credentials"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Signed In Successfully"
      )
    );
};

const userSignout = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User signed Out"));
};

const testConfig = async (req, res) => {
  res.status(201).json(new ApiResponse(201, "Configuring Test Passed"));
};

const getProfile = async (req, res) => {
  if (req.user) {
    return res
      .status(201)
      .json(new ApiResponse(201, req.user, "User Data Send successfully"));
  }
  return res.status(404).json(new ApiError(404, "No user"));
};

const searchedUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { fullName: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const user = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  return res.status(201).json(new ApiResponse(201, user, "Searched user"));
};

const allUsers = async(req, res) => {
  const users = await User.find({}).select("_id fullName username profileImage email");

  return res.status(200).json(
    new ApiResponse(200, users, "all users")
  )
} 

export {
  userSignin,
  userSignup,
  userSignout,
  testConfig,
  getProfile,
  allUsers,
  searchedUsers
};
