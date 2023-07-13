const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded.role !== "admin") {
      return res.status(401).json({
        status: "error",
        message: "Not an admin",
      });
    }
    req.userData = decoded;
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Auth failed",
    });
  }
  next();
};
