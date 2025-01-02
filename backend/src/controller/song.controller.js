import {Song} from '../models/song.model.js';

export const getAllSongs = async (req, res, next) => {
    try {
        const song = await Song.find().sort({createdAt: -1}); //.sort - newest song at top, oldest at bottom
        res.json(songs);
    } catch (error) {
        next(error);
    }
};

export const getFeaturedSongs = async (req, res, next) => {
    try {
        const songs = await Song.aggregate([      //fetch 6 random songs using mongoDB agregation pipeline
            {
                $sample: {size: 6},
            },
            {
                $project: { _id:1, title:1, artist:1, imageUrl:1, audioUrl:1 } //get these fields
            }
        ]);

        res.json(songs);

    } catch (error) {
        next(error);
    }
};

export const getMadeForYouSongs = async (req, res, next) => {
    try {
        const songs = await Song.aggregate([      //fetch 4 random songs using mongoDB agregation pipeline
            {
                $sample: {size: 4},
            },
            {
                $project: { _id:1, title:1, artist:1, imageUrl:1, audioUrl:1 } //get these fields
            }
        ]);

        res.json(songs);

    } catch (error) {
        next(error);
    }
};

export const getTrendingSongs = async (req, res, next) => {
    try {
        const songs = await Song.aggregate([      //fetch 6 random songs using mongoDB agregation pipeline
            {
                $sample: {size: 6}
            },
            {
                $project: { _id:1, title:1, artist:1, imageUrl:1, audioUrl:1 } //get these fields
            }
        ]);

        res.json(songs);

    } catch (error) {
        next(error);
    }
};