"use client"

import { useEffect, useState } from "react";
import { pages } from "./pages/pagesData";

export default function Book(){
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = pages.length || 5;
    //TEMPORARY REMEMBER TO CHANGE AFTER TESTING
 
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            console.log("key fired:", e.key);

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
        <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="relative w-[90vw] max-w-xl aspect-[3/4] bg-white shadow-md rounded-sm border border-ink/10 flex items-center justify-center">
            <p className="font-hand text-2xl text-ink/50">
            {totalPages === 0
                ? "No pages yet..."
                : `Page ${currentPage + 1} of ${totalPages}`}
            </p>
        </div>
        </div>
    );
}