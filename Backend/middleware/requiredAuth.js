const jwt = require("jsonwebtoken");
const User = require("../Models/userSchema");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  console.log(token)

  try {
    const {id } = jwt.verify(token, process.env.JWT_KEY);
    req.user = await User.findOne({ _id: id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
