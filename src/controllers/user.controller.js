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
      message: 'All Notes fetched successfully'
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
export const RegisterUser = async (req, res, next) => {
    // console.log(req.body)
    const data = await UserService.RegisterUser(req.body);
    if(!Error){
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'User Registrtaion is successfully'
      });
    }else{
      res.status(HttpStatus.BAD_REQUEST).json({
        code : HttpStatus.BAD_REQUEST,
        message: 'User with the same email already exists, Please Login'
      });
    }
};



export const Login = async (req, res, next) => {
  // console.log(req.body);
  try {
    const data = await UserService.Login(req.body);

    if (!data.error) {
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        message: 'User Login is successful',
      });
    } else {
      res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        message: data.error.message,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
};