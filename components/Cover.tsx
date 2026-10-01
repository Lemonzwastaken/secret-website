export default function Cover() {
    return(
        <div className="w-full h-full bg-[#5b3a2e] flex items-center justify-center p-8">
            <div className="w-full h-full border-2 border--[#e8d9b5]/60 outline outline-1 outline-offset-4 outline-[#e8d9b5]/30 flex flex-col items-center justify-center gap-6 text-center">
                <p className="font-hand text-2xl text-[#e8d9b5]/80">A little book of</p>
                <h1 className="font-display text-6xl text-[#f3e6c4] tracking-wide">
                    Video Game Photography
                </h1>
                <p className="font-hand text-xl text-[#e8d9b5]/70">
                    for everyone, with love :3
                </p>
                <p className="font-hand text-base text-[#e8d9b5]/50 mt-10 animate-pulse">
                    <span className="hidden md:inline">press → to open (press P for guide)</span>
                    <span className="md:hidden">swipe to open</span>
                </p>
            </div>
        </div>
    )
}