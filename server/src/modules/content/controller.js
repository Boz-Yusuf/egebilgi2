const Response = require("../../utils/response-types");
const service = require("./services");

// * GET END POINTS
const getNerSentence = async (req, res) => {
  console.log('test get ner')
  try {
    const responseData = await service.getNerSentence();
    const response = new Response.response(responseData, "", "", 200);
    res.send(response);
  } catch (error) {
    const response = new Response.emptyResponse(
      error,
      "Ner Sentence Getirilemedi",
      500
    );
    res.send(response);
  }
};

const getPosSentence = async (req, res) => {
  try {

    const responseData = await service.getPosSentence();
    const response = new Response.response(responseData, "", "", 200);
    res.send(response);

  } catch (error) {
    const response = new Response.emptyResponse(error, "", 500);
    res.send(response);
  }
};

// * POST END POINTS
const sendPosAnswer = async (req, res) => {
  console.log('1');
  const answer = req.body.answer;
  const userId = req.user.user_id;
  const contentId = req.body.content_id;

  try {
    const isTokenCreated = await service.checkUserContentPair(
      userId,
      contentId
    );
    if (isTokenCreated) {
      console.log('2');
      for (const key in answer) {
        if (answer.hasOwnProperty(key)) {
          const item = answer[key];
          const word = item.word;
          const label = item.label;
          const tokenId = await service.findToken(userId, contentId, word);
          await service.updateToken(tokenId, label, "pos");
        }
      }
      await service.updateSentenceSituation("pos", contentId);
      const response = new Response.emptyResponse(
        "",
        "pos datas was updated",
        200
      );
      res.send(response);
    } else {
      for (const key in answer) {
        if (answer.hasOwnProperty(key)) {
          const item = answer[key];
          const word = item.word;
          const label = item.label;
          await service.createToken(contentId, userId, word, label, "pos");
        }
      }
      service.createUserContentRecord(userId, contentId);
      const response = new Response.emptyResponse(
        "",
        "pos datas was added",
        200
      );
      res.send(response);
    }
    await service.updateSentenceSituation("pos", contentId);

  } catch (error) {
    const response = new Response.emptyResponse(error, "", 500);
    res.send(response);
  }
};

const sendNerAnswer = async (req, res) => {
  const answer = req.body.answer;
  const userId = req.user.user_id;
  const contentId = req.body.content_id;

  try {
    const isTokenCreated = await service.checkUserContentPair(
      userId,
      contentId
    );
    if (isTokenCreated) {
      for (const key in answer) {
        if (answer.hasOwnProperty(key)) {
          const item = answer[key];
          const word = item.word;
          const label = item.label;
          const tokenId = await service.findToken(userId, contentId, word);
          await service.updateToken(tokenId, label, "ner");
        }
      }
      await service.updateSentenceSituation("ner", contentId);
      const response = new Response.emptyResponse(
        "",
        "ner data was updated",
        200
      );
      res.send(response);
    } else {
      for (const key in answer) {
        if (answer.hasOwnProperty(key)) {
          const item = answer[key];
          const word = item.word;
          const label = item.label;
          await service.createToken(contentId, userId, word, label, "ner");
        }
      }
      service.createUserContentRecord(userId, contentId);
      await service.updateSentenceSituation("ner", contentId);
      const response = new Response.emptyResponse(
        "",
        "ner data was added",
        200
      );
      res.send(response);
    }
  } catch (error) {
    const response = new Response.emptyResponse(error, "", 500);
    res.send(response);
  }
};

module.exports = {
  getNerSentence,
  getPosSentence,
  sendNerAnswer,
  sendPosAnswer,
};
