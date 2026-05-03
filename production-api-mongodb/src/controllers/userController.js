const User = require("../models/User");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

/*
    REGISTER USER
*/
const registerUser = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase().trim();
    const { name, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/*
    LOGIN USER
*/
const loginUser = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase().trim();
    const password = req.body.password;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      token
    });
  } catch (error) {
    next(error);
  }
};

/*
    GET ALL USERS
*/
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("name email createdAt");

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/*
    GET SINGLE USER
*/
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id).select("name email createdAt");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/*
    UPDATE USER
*/
const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const { name, email, password } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    let updatedData = {
      name,
      email
    };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true
    }).select("name email createdAt");

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

/*
    DELETE USER
*/
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
