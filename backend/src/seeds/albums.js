import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing data
    await Album.deleteMany({});
    await Song.deleteMany({});

    // First, create all songs
    const createdSongs = await Song.insertMany([
      {
        title: "Role Model",
        artist: "Eminem",
        imageUrl: "/cover-images/1.jpg",
        audioUrl: "/songs/1.mp3",
        duration: 46, // 0:46
      },
      {
        title: "Criminal",
        artist: "Eminem",
        imageUrl: "/cover-images/2.jpg",
        audioUrl: "/songs/2.mp3",
        duration: 41, // 0:41
      },
      {
        title: "Without Me",
        artist: "Eminem",
        imageUrl: "/cover-images/3.jpg",
        audioUrl: "/songs/3.mp3",
        duration: 24, // 0:24
      },
      {
        title: "Mockingbird",
        artist: "Eminem",
        imageUrl: "/cover-images/4.jpg",
        audioUrl: "/songs/4.mp3",
        duration: 68, // 1:08
      },
      {
        title: "Beautifull",
        artist: "Eminem",
        imageUrl: "/cover-images/5.jpg",
        audioUrl: "/songs/5.mp3",
        duration: 33, // 0:33
      },
      {
        title: "Not Afraid",
        artist: "Eminem",
        imageUrl: "/cover-images/6.jpg",
        audioUrl: "/songs/6.mp3",
        duration: 56, // 0:56
      },
      {
        title: "Rap God",
        artist: "Eminem",
        imageUrl: "/cover-images/7.jpg",
        audioUrl: "/songs/7.mp3",
        duration: 51, // 0:51
      },
      {
        title: "Framed",
        artist: "Eminem feat. Rihanna",
        imageUrl: "/cover-images/8.jpg",
        audioUrl: "/songs/8.mp3",
        duration: 64, // 1:04
      },
      {
        title: "Godzilla",
        artist: "Eminem feat. Juice WRLD",
        imageUrl: "/cover-images/9.jpg",
        audioUrl: "/songs/9.mp3",
        duration: 53, // 0:53
      },
    //   {
    //     title: "When I'm Gone",
    //     artist: "Eminem",
    //     imageUrl: "/cover-images/10.jpg",
    //     audioUrl: "/songs/10.mp3",
    //     duration: 58, // 0:58
    //   },
      {
        title: "Houdini",
        artist: "Eminem",
        imageUrl: "/cover-images/11.jpg",
        audioUrl: "/songs/11.mp3",
        duration: 61, // 1:01
      },
      {
        title: "Day 'n' Night",
        artist: "Kid Cudi",
        imageUrl: "/cover-images/12.jpg",
        audioUrl: "/songs/12.mp3",
        duration: 63, // 1:03
      },
      {
        title: "Erase Me - Main",
        artist: "Kid Cudi",
        imageUrl: "/cover-images/13.jpg",
        audioUrl: "/songs/13.mp3",
        duration: 100, // 1:40
      },
      {
        title: "Good Life",
        artist: "Kanye West",
        imageUrl: "/cover-images/14.jpg",
        audioUrl: "/songs/14.mp3",
        duration: 59, // 0:59
      },
      {
        title: "Monster",
        artist: "Kanye West",
        imageUrl: "/cover-images/15.jpg",
        audioUrl: "/songs/15.mp3",
        duration: 46, // 0:46
      },
	  {
        title: "All Eyez on Me",
        artist: "2Pac",
        imageUrl: "/cover-images/16.jpg",
        audioUrl: "/songs/16.mp3",
        duration: 46, // 0:46
      },
	  {
        title: "California Love",
        artist: "2Pac",
        imageUrl: "/cover-images/17.jpg",
        audioUrl: "/songs/17.mp3",
        duration: 46, // 0:46
      },
	  {
        title: "Back Down",
        artist: "50 cent",
        imageUrl: "/cover-images/18.jpg",
        audioUrl: "/songs/18.mp3",
        duration: 46, // 0:46
      },
    ]);

    // Create albums with references to song IDs
    const albums = [
      {
        title: "The Slim Shady LP",
        artist: "Eminem",
        imageUrl: "/albums/1.jpg",
        releaseYear: 1999,
        songs: createdSongs.slice(0, 4).map((song) => song._id), // Assign first 4 songs
      },
      {
        title: "The Marshall Mathers LP",
        artist: "Eminem",
        imageUrl: "/albums/2.jpg",
        releaseYear: 2000,
        songs: createdSongs.slice(4, 8).map((song) => song._id), // Assign next 4 songs
      },
      {
        title: "The Eminem Show",
        artist: "Eminem",
        imageUrl: "/albums/3.jpg",
        releaseYear: 2002,
        songs: createdSongs.slice(8, 12).map((song) => song._id), // Assign next 4 songs
      },
      {
        title: "Recovery",
        artist: "Eminem",
        imageUrl: "/albums/4.jpg",
        releaseYear: 2010,
        songs: createdSongs.slice(12, 16).map((song) => song._id), // Assign last 4 songs
      },
    ];

    // Insert albums into the database
    const createdAlbums = await Album.insertMany(albums);

    // Update songs with their album references
    for (let i = 0; i < createdAlbums.length; i++) {
      const album = createdAlbums[i];
      const albumSongs = albums[i].songs;

      // Update songs with the album ID
      await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
