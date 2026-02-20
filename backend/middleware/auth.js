const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // check header exists
    if (!authHeader) {
      return res.status(401).json({
        msg: "No token provided",
      });
    }

    // format: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        msg: "Invalid token format",
      });
    }

    // verify token
    const decoded = jwt.verify(
      token,

      process.env.JWT_SECRET,
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid or expired token",
    });
  }
};
