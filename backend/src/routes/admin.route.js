import { Router } from 'express';
import { 
    checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong 
} from '../controller/admin.controller.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protectRoute, requireAdmin);

router.get('/check', checkAdmin);

//Songs
router.post('/songs', createSong); //if login and if admin, can create song
router.delete('/songs/:id', deleteSong);

//Albums
router.post('/albums', createAlbum);
router.delete('/albums/:id', deleteAlbum);

export default router;