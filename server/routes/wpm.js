import express from 'express';
import { getWPMs, addWPMs } from '../controllers/wpm.js';

//routing for anything that grabs texts
const router = express.Router();

router.get('/', getWPMs);
router.post('/', addWPMs);

export default router;