import User from '../models/User.js';
import { generateToken } from '../utils/jwtUtils.js';
import { AppError } from '../utils/errors.js';

class AuthService {
  async registerUser({ email, password, name }) {
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new AppError('User already exists', 400);
    }

    const user = await User.create({
      email,
      password,
      name
    });

    const token = generateToken(user._id);

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    };
  }

  async loginUser({ email, password }) {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = generateToken(user._id);

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profile: user.profile
      }
    };
  }

  async getUserProfile(user) {
    return {
      id: user._id,
      email: user.email,
      name: user.name,
      profile: user.profile
    };
  }

  async updateUserProfile(user, profileData) {
    user.profile = profileData;
    await user.save();

    return {
      id: user._id,
      email: user.email,
      name: user.name,
      profile: user.profile
    };
  }
}

export default new AuthService();