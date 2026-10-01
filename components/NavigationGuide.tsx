"use client"

import { useEffect, useState } from "react"

export default function NavigationGuide() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);

        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "p"){
                setIsOpen((prev) => !prev);
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };


    },[isMobile])

    if (isMobile || !isOpen) {
        return null;
    }

    return (
        <div>
                ←: previous, →: next, M: music (mute/unmute), P: this guide, 1,2,3,4: Open photos,  ESC: close photo
        </div>
    )

};