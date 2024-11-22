const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const AdminModel = require("../models/AdminModel");

const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;
  if (
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")) ||
    req.cookies.token
  ) {
    try {
      token = req.headers?.authorization?.split(" ")[1] || req.cookies.token;
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      const foundAdmin = await AdminModel.findById(decoded.id).select(
        "-password"
      );

      if (!foundAdmin) {
        return res
          .status(401)
          .json({ message: "Unauthorized, admin not found" });
      }

      req.adminId = decoded.id;


      next();
    } catch (error) {
      console.log(error);
      res.status(403).json({ message: "Forbidden, invalid token" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Unauthorized, no token" });
  }
});

module.exports = { protectAdmin };