const bcrypt = require('bcrypt')
const uuid = require('uuid')
const UserModel = require('../models/user-model')
const MailService = require('../services/mail-service')
const TokenService = require('../services/token-service')
const UserDto = require('../dto/user-dto')
const ApiError = require('../exceptions/api-error')

const getUserData = async (userModel) => {
  const userDto = new UserDto(userModel)
  const tokens = TokenService.generateTokens({...userDto})
  await TokenService.saveToken(userDto.id, tokens.refreshToken)

  return {...tokens, user: userDto}
}

class UserService {
  async registration(email, password) {

    const candidate = await UserModel.findOne({email})
    if(candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`)
    }

    const activationLink = uuid.v4();
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({email, password: hashPassword, activationLink})
    await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    return getUserData(user);
  }

  async login(email, password) {
    const user = await UserModel.findOne({email})
    if ( !user ) {
      throw ApiError.BadRequest(`Wrong email or passwors`)
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);

    if ( !isPasswordEquals ) {
      throw ApiError.BadRequest(`Wrong email or passwors`)
    }

    return getUserData(user);
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({activationLink})
    if (!user) {
      throw ApiError.BadRequest('Incorrect link')
    }

    user.isActivated = true
    return await user.save();
  }

  async logout(refreshToken) {
    return await TokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = TokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = TokenService.findToken(refreshToken)

    if(!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }

    const user = await UserModel.findById(userData.id);
    return getUserData(user);
  }

  async getAllUsers() {
    const userModelList = await UserModel.find();
    return userModelList.map(user => {
      return new UserDto(user)
    });
  }
}

module.exports = new UserService();