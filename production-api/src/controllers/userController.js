const prisma = require("../config/prisma");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

let users = [];

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

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
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
    console.log("LOGIN ATTEMPT:", email);

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    console.log("USER FOUND:", user);

    console.log("USER PASSWORD:", user?.password);
    console.log("TYPE:", typeof user?.password);
    console.log("INPUT PASSWORD:", password);

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH:", passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
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
    GET USERS
*/
const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * Get single User
 */

const getUserById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

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

/**
 * Update user
 */

const updateUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    let updatedData = { name, email };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updatedData
    });

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Delete user
 */

const deleteUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    await prisma.user.delete({
      where: { id }
    });

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
