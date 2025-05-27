import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AppError } from '../utils/errors.js';

export const protect = async (req, _, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Not authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    next(new AppError('Not authorized to access this route', 401));
  }
};