import { ReactNode } from "react";

export interface Song {
    songs: any;
    releaseYear: ReactNode;
    _id: string;
	title: string;
	artist: string;
	albumId: string | null;
	imageUrl: string;
	audioUrl: string;
	duration: number;
	createdAt: string;
	updatedAt: string;
}

export interface Album {
	albumId: string | undefined;
    createdAt: any;
	_id: string;
	title: string;
	artist: string;
	imageUrl: string;
	releaseYear: number;
	songs: Song[];
}

export interface Stats {
	totalSongs: number;
	totalAlbums: number;
	totalUsers: number;
	totalArtists: number;
}

export interface Message {
	_id: string;
	senderId: string;
	receiverId: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}

export interface User {
	_id: string;
	clerkId: string;
	fullName: string;
	imageUrl: string;
}