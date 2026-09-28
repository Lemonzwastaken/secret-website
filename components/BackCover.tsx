export default function BackCover() {
    return (
        <div className="relative w-full h-full bg-[#5b3a2e] flex items-center p-10 pr-14">
            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-1 from black/40 via-black/15 to-transparent" />
            <div className="absolute right-8 top-0 h-full w-px bg-black/30" />
            <div className="absolute right-[33px] top-0 h-full w-px bg-white/10" />

            <div className="w-full h-full border-2 border-[#e8d9b5]/60 outline outline-1 outline-offset-4 outline-[#e8d9b5]/30 flex flex-col items-center justify-center gap-6 text-center px-6">
                <p className="font-hand text-2xl text-[#e8d9b5]/80 leading-relaxed">
                    Thanks for being part of every page :3
                </p>
                <h2 className="font-display text-4xl text-[#f3e6c4] tracking wide">
                    See you soon twin 
                </h2>
                <p className="font-hand text-xl text-[#e8d9b5]/70">
                many more pages to fill
                </p>
                <p className="font-hand text-base text-[#e8d9b5]/50 mt-10">
                    <span className="hidden md:inline">← press to go back</span>
                    <span className="md:hidden">swipe to go back</span>
                </p>

            </div>

        </div>
    )
}