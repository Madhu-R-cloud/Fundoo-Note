import { error } from '@hapi/joi/lib/base';
import Notes from '../models/note.model';

//get all users
export const getNotes = async () => {
  const data = await Notes.find();
  return data;
};

//new user registration
export const  createNote = async (body) => {
try{
  
  const existingNote = await Notes.findOne({ title: body.title });
  if(existingNote==null) {
    const data = await Notes.create(body);
    return data;
  } else {
    return { error: new Error('User Note title is already exists')};      
}
}catch(error){
  console.log(error)
}
  }