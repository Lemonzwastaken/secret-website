"use client"

import { useEffect,useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Cover from "./Cover";
import BackCover from "./BackCover";
import { pages } from "./pages/pagesData";

const desktopPositions = [
    { top: "8%", left: "10%", rotate: -8 },
    { top: "15%", left: "48%", rotate: 6 },
    { top: "50%", left: "5%", rotate: 5 },
    { top: "55%", left: "45%", rotate: -5 },
    { top: "10%", left: "70%", rotate: 4 },
    { top: "60%", left: "70%", rotate: -7 },
]

const mobilePositions = [
    { top: "2%", left: "4%", rotate: -6 },
    { top: "5%", left: "52%", rotate: 5 },
    { top: "32%", left: "6%", rotate: 4 },
    { top: "34%", left: "50%", rotate: -5 },
    { top: "61%", left: "4%", rotate: -3 },
    { top: "62%", left: "52%", rotate: 4 },
]

export default function Book(){
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(1);
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string} | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const totalPages = pages.length + 2;
    const isCover = currentPage === 0;
    const isBack = currentPage === totalPages - 1;
    const isClosed = isCover || isBack;
    const spread = isClosed ? null : pages[currentPage - 1];
 
    const touchStartX = useRef<number | null>(null);

    function goNext() {
        setDirection(1);
        setCurrentPage((prev) => Math.min(prev+1, totalPages-1));
    }

    function goPrev() {
        setDirection(-1);
        setCurrentPage((prev) => Math.max(prev - 1, 0));
    }

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
        if (selectedImage) {
            if (e.key === "Escape") setSelectedImage(null);
            return;
        }
        if (e.key === "ArrowRight") {
            setDirection(1);
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
        } else if (e.key === "ArrowLeft") {
            setDirection(-1);
            setCurrentPage((prev) => Math.max(prev - 1, 0));
        }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [totalPages, selectedImage]);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 767px)");
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler)
    }, []);

    return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-3 md:p-6 gap-4">
    <div
        className={`relative w-full ${
            isClosed ? "max-w-xl" : "max-w-6xl"
        } h-[78dvh] md:h-[85vh] bg-[#fbf6ea] rounded-md border border-ink/10 flex overflow-hidden transition-[max-width] duration-500 ease-in-out shadow-[3px_3px_0_0_#efe6d2,6px_6px_0_0_#e2d8c0,9px_9px_0_0_#d6ccb2,14px_16px_24px_rgba(0,0,0,0.25)]`}
    
        onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
            if (touchStartX.current === null || selectedImage) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (dx < -50) goNext();
            else if (dx > 50) goPrev();
            touchStartX.current = null;
        }}
    >

        <AnimatePresence mode="wait" custom={direction}>
        <motion.div
            key={currentPage}
            custom={direction}
            initial={(dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 })}
            animate={{ opacity: 1, x: 0 }}
            exit={(dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 })}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col md:flex-row"
        >

        {isCover ? (
          <Cover />
        ) :isBack ? (
            <BackCover /> ) 
        : (
          <>
            <div className="hidden md:block pointer-events-none absolute left-1/2 top-0 z-10 h-full w-20 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/15 to-transparent" />

            {/* Left page: text and stuff (piccaso) */}
            <div className="w-full h-[28%] md:w-1/2 md:h-full flex items-center justify-center p-4 md:p-10 overflow-y-auto">
            {spread ? (
                <p className="font-hand text-lg md:text-2xl text-ink text-center leading-relaxed">
                {spread.text}
                </p>
            ) : (
                <p className="font-hand text-xl text-ink/40">No pages yet...</p>
            )}
            </div>

            {/* Right page: images (No wait this is picasso) */}
            <div className="w-full h-[72%] md:w-1/2 md:h-full relative p-3 md:p-10 overflow-hidden">
            {spread ? (
                spread.images.map((src, i) => {
                const positions = isMobile ? mobilePositions : desktopPositions
                const pos = positions[i % positions.length];
                return (
                    <div
                    key={i}
                    onClick={() => setSelectedImage({src, alt: `${spread.alt} ${i + 1}`})}
                    className="absolute bg-white p-1.5 pb-6 md:p-2 md:pb-5 shadow-md border border-ink/10 cursor-zoom-in transition-transform duration-200 md:hover:scale-105 md:hover:z-20"
                    style={{
                        top: pos.top,
                        left: pos.left,
                        width: isMobile ? "44%" : "40%",
                        height: isMobile ? "auto" : "40%",
                        transform: `rotate(${pos.rotate}deg)`,
                    }}
                    >
                    <img
                        src={src}
                        alt={`${spread.alt} ${i + 1}`}
                        className={
                            isMobile
                                ? "w-full aspect-square object-cover"
                                : "w-full h-full object-contain"
                        }
                    />
                    </div>
                );
                })
            ) : (
                <p className="font-hand text-xl text-ink/40">No images</p>
            )}
            </div>
          </>
        )}
        </motion.div>
        </AnimatePresence>

    </div>
        {/* buttons and page indicator :3*/}
        <div className="flex items-center gap-6">
        <button
            onClick={goPrev}
            disabled={currentPage === 0}
            className="md:hidden font-hand text-3xl text-ink/60 px-4 py-2 disabled:opacity-20"
        >
            ←
        </button>

        <div className="flex flex-col items-center gap-2">
            <p className="font-hand text-lg text-ink/60">
            {currentPage + 1} / {totalPages}
            </p>
            <div className="flex gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
                <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                    i === currentPage ? "w-4 bg-ink/70" : "w-1.5 bg-ink/25"
                }`}
                />
            ))}
            </div>
        </div>

        <button
            onClick={goNext}
            disabled={currentPage === totalPages - 1}
            className="md:hidden font-hand text-3xl text-ink/60 px-4 py-2 disabled:opacity-20"
        >
            →
        </button>
        </div>
        
        {/*enlarge images :P */}
        <AnimatePresence>
            {selectedImage && (
                <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 cursor-zoom-out"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                    className="bg-white p-3 pb-8 shadow-2xl"
                    initial={{ scale:0.85, rotate: -3}}
                    animate={{scale:1, rotate:0}}
                    exit={{scale:0.9}}
                    transition={{duration:0.25, ease:"easeOut"}}
                >
                    <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="max-h-[80vh] max-w-[85vw] object-contain"
                    />
                </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
    );
}