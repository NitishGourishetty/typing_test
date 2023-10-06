import express from 'express';
import { getTexts, addText } from '../controllers/texts.js'

//routing for anything that grabs texts
const router = express.Router();

router.get('/', getTexts);
router.post('/', addText);

export default router;