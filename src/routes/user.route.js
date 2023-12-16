import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

//route to create a new user registration
router.post('', newUserValidator, userController.RegisterUser);

//route to user login
router.post('/login', userController.Login);


export default router;