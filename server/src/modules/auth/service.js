const db = require("../../data/db");
const hashHelper = require("../../utils/helpers/hash-helper");

const logInUser = async (username) => {
  try {
    const userData = await db.one(
      "SELECT * FROM tbl_user WHERE username = $1 ;",
      [username]
    );
    return userData;
  } catch (error) {
    console.error("Kullanıcı girişi sırasında bir hata oluştu:", error);
    throw error;
  }
};

const registerUser = async (username, password) => {
  try {
    const hashedPassword = hashHelper.hashPassword(username, password);
    db.none("INSERT INTO tbl_user (username,password) VALUES ($1,$2)", [
      username,
      hashedPassword,
    ]);
  } catch (error) {
    throw error;
  }
};

const testSql = async () => {
  const data = db.manyOrNone("SELECT * FROM tbl_user");
};

module.exports = { logInUser, registerUser, testSql };
