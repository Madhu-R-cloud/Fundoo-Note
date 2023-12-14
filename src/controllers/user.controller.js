import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import date from '@hapi/joi/lib/types/date';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};



/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  
    const data = await UserService.newUser(req.body);
    if(!Error){
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'User Registrtaion is successfully'
      });
    }else{
      res.status(409).json({
        code : 409,
        message: 'User with the same email already exists, Please Login'
      });
    }
};
