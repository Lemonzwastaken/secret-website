import { useEffect, useRef, useState } from "react";

const MUTE_KEY = "photo-book-muted"

export function useMusic() {
    const [muted, setMuted] = useState(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem(MUTE_KEY) === "true";
    });
    const [started, setStarted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = muted;
        }
    }, [muted]);

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