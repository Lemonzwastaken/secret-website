"use client"

import { useState, useEffect, type ReactNode } from "react"
import { PASSWORD_ENABLED, PASSWORD, REMEMBER_UNLOCK } from "./passwordConfig"

const STORAGE_KEY = "photo-book-unlocked";

export default function PasswordGate({children} : {children: ReactNode}) {
    const [unlocked, setUnlocked] = useState(!PASSWORD_ENABLED);
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const [checked, setChecked] = useState(!PASSWORD_ENABLED);

    useEffect(() => {
        if (!PASSWORD_ENABLED) return;
        if (REMEMBER_UNLOCK) {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved === "true") setUnlocked(true);
        }
        setChecked(true);
    }, []);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (input === PASSWORD) {
            if (REMEMBER_UNLOCK) localStorage.setItem(STORAGE_KEY, "true");
            setUnlocked(true);
            setError(false);
        } else {
            setError(true);
        }
    }

    if (!checked) return null;

    if (unlocked) return <>{children}</>

    return (
        <div className="min-h-screen bg-paper flex items-center justify-center p-6">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-4 text-center"
            >
                <p className="font-hand text-2xl text-ink"> pssst enter your message here :3</p>
                <input
                type="password"
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                    setError(false);
                }}
                autoFocus
                className="font-hand text-x1 text-center bg-white border border-ink/20 rounded-md px-4 py-2 w-64 focus:outline-none focus:border-ink/50"
                placeholder="password"
                />

                {error && (
                    <p className="font-hand text-sm text-red-500">not quite, try again</p>
                )}
                <button
                    type="submit"
                    className="font-hand text-lg text-ink/70 border border-ink/20 rounded-md px-6 py-2 hover:bg-ink/5"
                >
                    press ENTER to open
                </button>
            </form>
        </div>
    );
}   