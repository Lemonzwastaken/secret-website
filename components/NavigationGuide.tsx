"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion";
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
    <AnimatePresence>
        {isOpen && (
            <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
        >
            <motion.div
                className="bg-[#fbf6ea] border border-ink/15 px-10 py-7 shadow-2xl"
                initial={{opacity:0, scale:0.9}}
                animate={{opacity:1, scale:1}}
                exit={{opacity: 0, scale: 0.9}}
                transition={{duration: 0.9}}
            >
                <div className="font-hand text-lg text-ink/80 whitespace-nowrap">
                    <div className="text-center text-2xl mb-4">
                        Navigation
                    </div>

                    <div className="h-px bg-ink/15 mb-4" />

                    <div className="flex items-center justify-center gap-5 ">
                        <span>← previous</span>
                        <span>→ next</span>
                        <span>M mute/unmute music</span>
                        <span>1,2,3,4 select photos</span>
                        <span>ESC close selected photo</span>
                        <span>P close guide</span>
                    </div>
                </div>

            </motion.div>
        </motion.div>
        )}
    </AnimatePresence>
    );

};