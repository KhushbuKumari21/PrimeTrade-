const router = require("express").Router();

const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register new user
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({
        msg: "All fields required",
      });

    const existing = await User.findOne({ email });

    if (existing)
      return res.status(400).json({
        msg: "User already exists",
      });

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      name,

      email,

      password: hash,

      role: role || "user",
    });

    res.status(201).json({
      msg: "Registration successful",
    });
  } catch {
    res.status(500).json({
      msg: "Registration failed",
    });
  }
});

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 */
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user)
      return res.status(400).json({
        msg: "User not found",
      });

    const valid = await bcrypt.compare(
      req.body.password,

      user.password,
    );

    if (!valid)
      return res.status(400).json({
        msg: "Wrong password",
      });

    const token = jwt.sign(
      {
        id: user._id,

        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d",
      },
    );

    res.json({
      token,
    });
  } catch {
    res.status(500).json({
      msg: "Login failed",
    });
  }
});

module.exports = router;
