'use client'
import { useState } from "react"
export function RatingSelector() {

    let [rating, setRating] = useState<number>(0);
    let [hoverRating, setHoverRating] = useState<number>(0);

    let selecting = (id: number) => {
        setRating(id);

    }
    let hoverFill = (id: number) => {
        setHoverRating(id);
    }
    let hoverEmpty = () => {
        setHoverRating(0);
    }
    let hearts = [1, 2, 3, 4, 5].map(heart => {
        let isFilled = heart <= (rating || hoverRating)
        return (<button type="button" aria-label={`Rate ${heart} ${ heart == 1 ? "heart" : "hearts"}`}  className="text-2xl hover:text-3xl" onMouseLeave={() => { hoverEmpty() }} onMouseOver={() => { hoverFill(heart) }} onClick={(e) => { selecting(heart) }} key={heart}>{isFilled ? "❤️" : "🩶"}</button>)

    })



    return <div className="text-lg mb-1">
        <input type="hidden" name="rating" value={rating} />

        {hearts}
    </div>

}