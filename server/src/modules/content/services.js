const db = require("../../data/db");

const getNerSentence = async () => {
  try {
    const data = await db.manyOrNone(
      "SELECT * FROM tbl_contents WHERE ner = false ORDER BY RANDOM() LIMIT 1;"
    );
    return [data, "ner"];
  } catch (error) {
    throw error;
  }
};

const getPosSentence = async () => {
  try {
    const data = await db.manyOrNone(
      "SELECT * FROM tbl_contents WHERE pos = false ORDER BY RANDOM() LIMIT 1;"
    );
    return [data, "pos"];
  } catch (error) {
    throw error;
  }
};

const updateSentenceSituation = async (type, contentId) => {
  try {
    if (type === "pos") {
      await db.none("UPDATE tbl_contents SET pos = $1 WHERE content_id = $2", [
        true,
        contentId,
      ]);
    } else {
      await db.none("UPDATE tbl_contents SET ner = $1 WHERE content_id = $2", [
        true,
        contentId,
      ]);
    }
  } catch (error) {
    throw error;
  }
};

// this func creates new token pos or ner depends on type
const createToken = async (contentId, userId, word, label, type) => {
  try {
    if (type == "pos") {
      await db.none(
        "INSERT INTO tbl_tokens (content_id, user_id, token, pos) VALUES ($1,$2,$3,$4);",
        [contentId, userId, word, label]
      );
    } else if (type == "ner") {
      await db.none(
        "INSERT INTO tbl_tokens (content_id, user_id, token, ner) VALUES ($1,$2,$3,$4);",
        [contentId, userId, word, label]
      );
    } else {
      throw new Error("Geçersiz token tipi. 'pos' veya 'ner' olmalıdır.");
    }
  } catch (error) {
    throw error;
  }
};

const findToken = async (userId, contentId, word) => {
  try {
    const result = await db.one(
      "SELECT token_id FROM tbl_tokens WHERE user_id = $1 AND content_id = $2 AND token = $3",
      [userId, contentId, word]
    );
    const tokenId = result.token_id;

    return tokenId;
  } catch (error) {
    throw error;
  }
};
// this func updates new token to add pos or ner depends on type
const updateToken = async (tokenId, label, type) => {
  try {
    const numericTokenId = parseInt(tokenId, 10);
    if (type == "pos") {
      await db.none("UPDATE tbl_tokens SET pos = $1 WHERE token_id = $2", [
        label,
        numericTokenId,
      ]);
    } else {
      await db.none("UPDATE tbl_tokens SET ner = $1 WHERE token_id = $2", [
        label,
        numericTokenId,
      ]);
    }
  } catch (error) {
    throw error;
  }
};

const checkUserContentPair = async (user_id, content_id) => {
  try {
    const tokenRecord = await db.oneOrNone(
      "SELECT * FROM tbl_user_content WHERE user_id = $1 AND content_id = $2",
      [user_id, content_id]
    );
    if (tokenRecord) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

const createUserContentRecord = async (user_id, content_id) => {
  try {
    await db.none(
      "INSERT INTO tbl_user_content (user_id, content_id) VALUES ($1, $2)",
      [user_id, content_id]
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getNerSentence,
  getPosSentence,
  createToken,
  checkUserContentPair,
  createUserContentRecord,
  findToken,
  updateToken,
  updateSentenceSituation,
};
