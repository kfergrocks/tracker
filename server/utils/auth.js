const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');
require('dotenv').config();

const secret = process.env.DB_TOKEN_KEY;
const expiration = '2h';

const getToken = (req) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }
  return token;
};
const checktoken = (req) => {
  try {
    const token = getToken(req);

    if (!token) {
      return false;
    }

    jwt.verify(token, secret, { maxAge: expiration });
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = {
  authenticationMiddleware: function (req, res, next) {
    const isTokeValid = checktoken(req);
    if (isTokeValid) {
      next();
    } else {
      res.status(400).end();
    }
  },
  authenticationAndAuthorizationMiddleware: function (req, res, next) {
    const isTokeValid = checktoken(req);

    if (isTokeValid) {
      const token = jwtDecode(getToken(req));
      req.body.user_id = parseInt(token.data.id);
      next();
    } else {
      res.status(400).end();
    }
  },
  signToken: function ({ id, fName }) {
    const payload = { id, fName };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
