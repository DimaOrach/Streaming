import express, { json } from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import fileUpload from 'express-fileupload';
import path from 'path';

import { connectDB } from './lib/db.js';
import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import authRoutes from './routes/auth.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statRoutes from './routes/stat.route.js';


dotenv.config();
const app = express();
const __dirname = path.resolve();
app.use(express(json));
app.use(clerkMiddleware());
app.use(fileUpload({                      //creating temporary folder for img/audio
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'tmp'),
  createParentPath: true,
  limits: {
    fileSize: 10 * 1024 * 1024 // max file size = 10mb
  }
}));

app.use('/api/users', userRoutes);
app.use('/api/admin/songs', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statRoutes);

app.listen(process.env.PORT, ()=> console.log(
    `Server is working on port ${process.env.PORT}`, connectDB()
  ));
