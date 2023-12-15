import { error } from '@hapi/joi/lib/base';
import User from '../models/user.model';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//new user registration
export const RegisterUser = async (body) => {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(body.email);

  if (!isEmailValid) {
    return new Error('Invalid email format');
  }
  const existingUser = await User.findOne({ $or: [{ email: body.email }, { phone: body.phone }] });

    if (existingUser) {
        if (existingUser.email === body.email) {
            return new Error('User with the same email already exists');
        } else if (existingUser.phone === body.phone) {
            return new Error('User with the same phone number already exists');
        }
  else {
    const data = await User.create(body);
    return data;
  }
}
};

// User Login
export const Login = async (body) => {
  try {
    const user = await User.findOne({ email: body.email });

    if (!user) {
      return { error: new Error('User does not exist. Please register first.') };
    }

    if (user.password == body.password) {
      console.log('Login Success');
      return { user };
    } else {
      return { error: new Error('Invalid credentials') };
    }
  } catch (error) {
    console.error(error);
    return { error };
  }  
};
