let jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "dermstore");
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Invalid token");
  }
};

module.exports = { verifyUser };
