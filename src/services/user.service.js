import { error } from '@hapi/joi/lib/base';
import User from '../models/user.model';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//new user registration
export const newUser = async (body) => {
  const userExists = await User.findOne({ email: body.email });

  if (userExists) {
      return new Error('User with the same email already exists');
  } else {
      const data = await User.create(body);
      console.log('User created successfully');
      return data;
  }
};
