import { Router } from 'express';
import { 
    checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong 
} from '../controller/admin.controller.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/check', protectRoute, requireAdmin, checkAdmin);

//Songs
router.post('/songs', protectRoute, requireAdmin, createSong); //if login and if admin, can create song
router.delete('/songs/:id', protectRoute, requireAdmin, deleteSong);

//Albums
router.post('/albums', protectRoute, requireAdmin, createAlbum);
router.delete('/songs/:id', protectRoute, requireAdmin, deleteAlbum);

export default router