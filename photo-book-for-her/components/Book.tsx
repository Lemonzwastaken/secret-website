"use client"

import { useState } from "react";
import { pages } from "./pages/pagesData";

export default function Book(){
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = pages.length;
 
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