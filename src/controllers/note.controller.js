import HttpStatus from 'http-status-codes';
import * as noteServices from '../services/note.services';
import { error } from '@hapi/joi/lib/base';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getNotes = async (req, res, next) => {
    try {
      const data = await noteServices.getNotes();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All users fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  export const createNote = async (req, res, next) => {
  
    const data = await noteServices.createNote(req.body);
    
    if(!data.error){
      res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User Note is created successfully'
    });     
    }else{
      res.status(HttpStatus.BAD_REQUEST).json({
        code : HttpStatus.BAD_REQUEST,
        message: 'User Note title is already exists'
      });
    }
};
