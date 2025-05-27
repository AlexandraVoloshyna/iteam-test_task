import authService from '../services/authService.js';

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const result = await authService.registerUser({ email, password, name });
      
      res.status(201).json({
        success: true,
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.loginUser({ email, password });
      
      res.status(200).json({
        success: true,
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const user = await authService.getUserProfile(req.user);
      
      res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const user = await authService.updateUserProfile(req.user, req.body.profile);
      
      res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();