import { Song } from '../models/song.model.js';
import { Album } from '../models/album.model.js';

export const createSong = async (req, res) => {
    try {
        if(!req.file || !req.file.audiofile || !req.file.imageFile) {
            return res.status(400).json({message: 'You need to upload all files!'});
        }

        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.file.audioFile;
        const imageFile = req.file.imageFile;

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null
        });

        await song.save();  //save song in DB

        //if song in an album - update album's songs array
        if(albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push:{songs: song._id},
            });
        }

        return res.status(201).json(song);

    } catch (error) {
        console.log('Error in createSong', error);
        res.status(500).json({message: 'Internal server error', error});
    }
};