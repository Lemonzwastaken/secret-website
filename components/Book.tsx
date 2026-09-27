"use client"

import { useEffect, useState } from "react";
import { pages } from "./pages/pagesData";

export default function Book(){
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = pages.length;
    const spread = pages[currentPage];
 
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "ArrowRight") {
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
        } else if (e.key === "ArrowLeft") {
            setCurrentPage((prev) => Math.max(prev - 1, 0));
        }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [totalPages]);

    return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-6">
    <div className="relative w-full h-[90vh] bg-white shadow-md rounded-sm border border-ink/10 flex">
        {/* Left page: text and stuff */}
        <div className="w-1/2 h-full flex items-center justify-center p-10 border-r border-ink/10">
        {spread ? (
            <p className="font-hand text-2xl text-ink text-center leading-relaxed">
            {spread.text}
            </p>
        ) : (
            <p className="font-hand text-xl text-ink/40">No pages yet...</p>
        )}
        </div>

        {/* Right page: images */}
        <div className="w-1/2 h-full relative p-10 overflow-hidden">
        {spread ? (
            spread.images.map((src, i) => {
            const positions = [
                { top: "8%", left: "10%", rotate: -8 },
                { top: "15%", left: "48%", rotate: 6 },
                { top: "50%", left: "5%", rotate: 5 },
                { top: "55%", left: "45%", rotate: -5 },
                { top: "10%", left: "70%", rotate: 4 },
                { top: "60%", left: "70%", rotate: -7 },
            ];
            const pos = positions[i % positions.length];
            return (
                <div
                key={i}
                className="absolute bg-white p-2 pb-5 shadow-md border border-ink/10"
                style={{
                    top: pos.top,
                    left: pos.left,
                    width: "40%",
                    height: "40%",
                    transform: `rotate(${pos.rotate}deg)`,
                }}
                >
                <img
                    src={src}
                    alt={`${spread.alt} ${i + 1}`}
                    className="w-full h-full object-contain"
                />
                </div>
            );
            })
        ) : (
            <p className="font-hand text-xl text-ink/40">No images</p>
        )}
        </div>
    </div>
    </div>
    );
}