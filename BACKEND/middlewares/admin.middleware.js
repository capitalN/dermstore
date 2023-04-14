const isAdmin = (req, res, next) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    // 403 access forbidden
    res.status(403).send("You must be an admin to perform this action");
  }
};

module.exports = { isAdmin };
