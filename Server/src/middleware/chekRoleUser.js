exports.checkIsAdmin = (req, res, next) => {
  console.log("chek admin");
  if (req.user.isAdmin) {
    return next();
  } else {
    return res.status(401).send({ message: "Admin Token is not valid." });
  }
};
