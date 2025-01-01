import { Router } from 'express';
import { createSong } from '../controller/admin.controller.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/songs', protectRoute, requireAdmin, createSong); //if login and if admin, can create song

export default router