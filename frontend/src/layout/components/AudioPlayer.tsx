import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevSongRef = useRef<string | null>(null);

    const { currentSong, isPlaying, playNext } =usePlayerStore()

    useEffect(() => {   //play and pause logic
        if(isPlaying) audioRef.current?.play();
        else audioRef.current?.pause();
    }, [isPlaying]);

    useEffect(() => {  //song end logic
        const audio = audioRef.current; 
        const handleEnded = () => {
            playNext();
        };
        audio?.addEventListener('ended', handleEnded);
        return () => audio?.removeEventListener('ended', handleEnded);
    }, [playNext]);

    useEffect(() => { //song change logic
        if(!audioRef.current || !currentSong) return;

        const audio = audioRef.current;
        const isSongChange = prevSongRef.current !== currentSong?.audioUrl; //check if song changed
        if(isSongChange) {
            audio.src = currentSong?.audioUrl;
            audio.currentTime = 0;  //reset the playback position
            prevSongRef.current = currentSong?.audioUrl;
            if(isPlaying) audio.play();
        }
    }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;