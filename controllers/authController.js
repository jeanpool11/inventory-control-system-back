const { compare } = require("../utils/handleJwt");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../utils/handleError");
const { tokenSign } = require("../utils/handleToken");

const { UserModel } = require("../models");
const { matchedData } = require("express-validator");

/**
 * Controller for login
 * @param {*} req
 * @param {*} res
 * @returns
 */
const loginCtrl = async (req, res) => {
  try {
    const body = matchedData(req);
    const user = await UserModel.findOne({ email: body.email });
    if (!user) {
      handleErrorResponse(res, "USER_NOT_EXISTS", 404);
      return;
    }
    const checkPassword = await compare(body.password, user.password);

    if (!checkPassword) {
      handleErrorResponse(res, "PASSWORD_INVALID", 402);
      return;
    }

    const tokenJwt = await tokenSign(user);

    const data = {
      token: tokenJwt,
      user: user,
    };

    res.send({ data });
  } catch (e) {
    console.error("LOGIN ERROR:", e);
res.status(500).json({ error: e.message || "INTERNAL_ERROR" });

  }
};



module.exports = { loginCtrl };