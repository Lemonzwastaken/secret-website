import { useEffect, useRef, useState } from "react";

const MUTE_KEY = "photo-book-muted"

export function useMusic() {
    const [muted, setMuted] = useState(false);
    const [started, setStarted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem(MUTE_KEY);
        if (saved === "true") {
            setMuted(true);
            if (audioRef.current) audioRef.current.muted = true;
        }

    }, []);

    function startMusic() {
        if (started) return;
        setStarted(true);
        if (audioRef.current) audioRef.current.muted = muted;
        audioRef.current?.play().catch(() => {

        })
    }

    function toggleMute() {
        setMuted((prev) => {
            const next = !prev;
            if (audioRef.current) audioRef.current.muted = next;
            localStorage.setItem(MUTE_KEY, String(next));
            return next;
        });
        startMusic();
    }


    return {audioRef, muted, startMusic, toggleMute};
}