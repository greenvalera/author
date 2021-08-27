const jwt = require('jsonwebtoken');
const tokenModel = require('../models/tocken-model')

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: '15s'});
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: '30s'});

    return {
      accessToken,
      refreshToken
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, JWT_REFRESH_SECRET)
    } catch (e) {
      return null;
    }
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, JWT_ACCESS_SECRET)
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({user: userId});
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({user: userId, refreshToken});
    return token.save();
  }

  async findToken(refreshToken) {
    return tokenModel.findOne({refreshToken});
  }

  async removeToken(refreshToken) {
    return tokenModel.deleteOne({refreshToken})
  }
}

module.exports = new TokenService();