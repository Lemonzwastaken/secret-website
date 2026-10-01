import { RefObject } from "react";

export default function MusicButton({
    audioRef,
    muted,
    onToggle,
} : {
    audioRef: RefObject<HTMLAudioElement | null>;
    muted: boolean;
    onToggle: () => void;
}) {
    return (
        <>
            <audio ref={audioRef} src="/music/TheWhale.mp3" loop />
            <button
                onClick={onToggle}
                className="fixed bottom-4 right-4 z-40 w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-ink/10 shadow-md flex items-center justify-center text-lg"
                aria-label={muted ? "Unmute music" : "Mute music"}
            >
                {muted ? "🔇" : "🎵"}
            </button>
        </>
    );
}