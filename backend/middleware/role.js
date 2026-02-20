module.exports = (requiredRole) => {
  return (req, res, next) => {
    try {
      // check user exists
      if (!req.user) {
        return res.status(401).json({
          msg: "Unauthorized",
        });
      }

      // check role
      if (req.user.role !== requiredRole) {
        return res.status(403).json({
          msg: "Access denied: insufficient permissions",
        });
      }

      next();
    } catch {
      return res.status(500).json({
        msg: "Role validation failed",
      });
    }
  };
};
