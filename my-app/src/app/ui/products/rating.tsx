export default function Rating({ rating, n_ratings }: { rating: number; n_ratings: number }) {
    let starsN = Math.round(rating);
    let stars = "";
    for (let i = 0; i < starsN; i++) {
        stars += "❤️"
    }
    if (starsN < 5) {
        let lefting = 5 - starsN;
        for (let i = 0; i < lefting; i++) {
            stars += "🩶"
        }
    }
    return <>
        <span>{stars}</span>
        <span className="ml-1 text-sm text-blue-600">({n_ratings})</span>
    </>

}