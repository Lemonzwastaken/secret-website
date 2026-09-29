# E-Journal

A little digital scrapbook I built for everyone to write their own experiences with photos, because a folder of camera roll photos didn't feel like enough. You can flip through it like an actual book using the arrow keys on desktop, swipes on your phone and every page has a handwritten-style note next to a pile of photos scattered around like they were just tossed onto the page.

**Live site:** [https://journal-website-five.vercel.app/]

## Stuff included in this REPO

- Compatability for phones and desktop, phones can use swiping or tapping the arrows, desktops only use arrow keys
- Every spread has a caption on one side and a scattered, slightly-tilted polaroid collage on the other
- Pages actually flip in 3D on desktop, like a real book, and just slide on mobile since there's no spine to flip over
- Both a front and a back cover
- Expand any photo by clicking on it
- Some background music that kicks in the first time you touch anything, with a mute button if too irritating (made by me ofcourse (also replaceable))
- Built to not look terrible on a phone, which took more tweaking than I expected

## Tech Stack

| Category | Tools |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router, TypeScript) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 |
| Fonts | [Patrick Hand](https://fonts.google.com/specimen/Patrick+Hand) + [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) via `next/font/google` |

## How the pages are set up

Each page of the book (a "spread") is its own tiny file, so I could write one, commit it, and move on to the next without touching anything else. If you're building your own, this is the part you'll actually spend time in.

```
components/
  Book.tsx          → the "engine": navigation, animations, layout
  Cover.tsx         → front cover
  BackCover.tsx     → back cover / closing page
  MusicButton.tsx   → background music player + mute button
  useMusic.ts       → hook holding the music state/logic
  pages/
    pagesData.ts    → the ordered list of every spread in the book
    spread1.ts
    spread2.ts
    ...
public/
  photos/
    page1/
    page2/
    ...
  music/
    yourSong.mp3
```

Each spread file looks like this:

```ts
// components/pages/spread1.ts
export const spread1 = {
  id: 1,
  text: "The day we first met...",
  images: [
    "/photos/page1/photo1.jpg",
    "/photos/page1/photo2.jpg",
  ],
  alt: "Description of the photos",
};
```

and gets registered in `pagesData.ts`:

```ts
import { spread1 } from "./spread1";
import { spread2 } from "./spread2";

export const pages = [spread1, spread2];
```

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
git clone https://github.com/yourusername/photo-book-for-her.git
cd photo-book-for-her
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run start
```

## Want to make your own version?

Go for it, that's kind of the point. Here's what to actually touch:

1. **Photos.** Drop them into `public/photos/pageN/`, one folder per page.
2. **Spreads.** Copy `spread1.ts`, swap in your own `text`, `images`, and `alt`, then add it to the list in `pagesData.ts`. Rinse and repeat for every page. A better instruction has been given in the form of a .txt file
3. **Cover and back cover.** Change the title, name, and whatever you want the closing message to say in `components/Cover.tsx` and `components/BackCover.tsx`.
4. **Music.** Swap the file in `public/music/` and point `components/MusicButton.tsx` at the new filename.
5. **The look.** Colors and fonts live in `app/globals.css` under the `@theme` block. The scattered photo positions are the `desktopPositions` / `mobilePositions` arrays near the top of `Book.tsx` if you want them arranged differently.

## Deployment

It's a normal Next.js app, so it deploys cleanly to:

- **[Vercel](https://vercel.com/)** — this is what I used. Push to GitHub, import the repo on Vercel, done. Every push after that auto-redeploys, so you can keep adding pages and the live link just updates itself.

## License

No license, do whatever you want with it. If you end up building one of these for someone, I hope they like it :D

## AI Declaration

I used AI to help me with implementation of features like the page flipping and designing the cover and other small tweaks such as color or fonts

AI was also used for debugging and fixing errors I got while working on the website
