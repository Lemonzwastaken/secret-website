"use client"

import { useEffect, useState } from "react";
import { pages } from "./pages/pagesData";

export default function Book(){
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = pages.length || 2; //TEMPORARY
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
        <div className="w-1/2 h-full flex items-center justify-center p-6 overflow-hidden">
        {spread ? (
            <div className="grid grid-cols-2 gap-3 w-full h-full auto-rows-fr">
            {spread.images.map((src, i) => (
                <img
                key={i}
                src={src}
                alt={`${spread.alt} ${i + 1}`}
                className="w-full h-full object-cover rounded-sm shadow-sm border border-ink/10"
                />
            ))}
            </div>
        ) : (
            <p className="font-hand text-xl text-ink/40">No images</p>
        )}
        </div>
    </div>
    </div>
    );
}