import { useRef, useState } from "react";

export function useMusic() {
    const [muted, setMuted] = useState(false);
    const [started, setStarted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    function startMusic() {
        if (started) return;
        setStarted(true);
        audioRef.current?.play().catch(() => {

        })
    }

    function toggleMute() {
        setMuted((prev) => {
            const next = !prev;
            if (audioRef.current) audioRef.current.muted = next;
            return next;
        });
        startMusic();
    }

    return {audioRef, muted, startMusic, toggleMute};
}