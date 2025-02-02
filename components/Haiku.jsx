"use client"

import { CldImage } from "next-cloudinary"
import Link from "next/link"
import { deleteHaiku } from "../actions/haikuController"

export default function Haiku(props){
    props.haiku.photo = props.haiku.photo? props.haiku.photo: "samples/fallback";
    return(
        <div className="relative rounded-xl mx-auto overflow-hidden max-w-[650px] mb-7">
            <img src="/aspect-ratio.png" />
            <div className="absolute inset-0 bg-gray-200 grid">
                <span className="loading loading-dots loading-lg m-auto"></span>
            </div>

            <CldImage
                className="absolute inset-0"
                width="650"
                height="300"
                src={props.haiku.photo}
                sizes="650px"
                alt={props.haiku.line1}
                crop={{type: "pad", source: true}}
                fillBackground
                overlays={[{
                    position: { x: 34, y: 100, angle: -10, gravity: "north_west"},
                    text: { color: "black", fontFamily: "Source Sans Pro", fontSize: 42, fontWeight: "bold", text: `${props.haiku.line1}%0A${props.haiku.line2}%0A${props.haiku.line3}`}
                }, {
                    position: { x: 32, y: 98, angle: -10, gravity: "north_west"},
                    text: { color: "white", fontFamily: "Source Sans Pro", fontSize: 42, fontWeight: "bold", text: `${props.haiku.line1}%0A${props.haiku.line2}%0A${props.haiku.line3}`}
                }]}
            />
            <div className="absolute bottom-2 right-2 flex">
                <Link className="inline-block mr-1 bg-black/40 hover:bg-black/50 p-1 text-white/60 hover:text-white/80 rounded" 
                    href={`/edit-haiku/${props.haiku._id.toString()}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                        <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
                        <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
                    </svg>
                </Link>
                <form action={deleteHaiku}>
                    <input name="id" type="hidden" defaultValue={props.haiku._id.toString()}/>
                    <button className="block bg-black/40 hover:bg-black/50 p-1 text-white/60 hover:text-white/80 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                            <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}