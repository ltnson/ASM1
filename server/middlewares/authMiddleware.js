const fs = require("fs");
const path = require("path");

const userTokens = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/userToken.json"), "utf8")
);

exports.authenticateToken = (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = userTokens.find((user) => user.token === token);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = user;
  next();
};
