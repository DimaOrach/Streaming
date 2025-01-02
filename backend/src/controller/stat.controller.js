import { Song } from '../models/song.model.js';
import { User } from '../models/user.model.js';
import { Album } from '../models/album.model.js';

export const getStats = async (req, res, next) => {
    try {
            const [totalSongs, totalUsers, totalAlbums, uniqueArtsits] = await Promise.all([
                Song.countDocuments(),  //number of all songs in DB
                User.countDocuments(),  //number of all users in DB
                Album.countDocuments(),  //number of all albums in DB
    
                //Fetch all song, all albums, group them with artist, count number of artists
                Song.aggregate([
                    {
                        $unionWith:{
                            call:'albums',
                            pipeline: [],
                        }
                    },
                    {
                        $group:{
                            _id: '$artist',
                        }
                    },
                    {
                        $count: 'count',
                    }
                ]),
            ]);
    
            res.status(200).json({
                totalSongs,
                totalUsers,
                totalAlbums,
                totalArtists: uniqueArtsits[0]?.count || 0,
            });
        } catch (error) {
            next(error);
        }
};