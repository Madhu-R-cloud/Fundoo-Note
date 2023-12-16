import express from 'express';
import * as noteController from '../controllers/note.controller';

const router = express.Router();

//route to get all users
router.get('', noteController.getNotes);


router.post('', noteController.createNote);




export default router;