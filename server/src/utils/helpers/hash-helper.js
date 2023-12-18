const crypto = require("crypto");

const hashPassword = (username, password) => {
  let hash = crypto.createHmac("sha512", username);
  hash.update(password);
  return hash.digest("hex");
};

module.exports = {
  hashPassword,
};
