import { Review } from "../lib/definitions";
import { numberToHearts } from "../lib/utils";
import { Product } from "@/app/lib/definitions";

export function ReviewTableSellerPage({ reviews }: { reviews: Array<Review> }) {
    return (
        <div className="grid grid-cols-2 px-4 hidden md:grid gap-x-2">
            <h3 className="col-span-2 text-center mt-4 mb-2 font-bold text-xl">Last Reviews</h3>

            {reviews.map((review) => <ReviewView review={review} key={review.id} />)}

        </div>
    )
}


export function ReviewView({ review, short }: { review: Review, short?: boolean }) {

    const hearts = numberToHearts(Math.floor(review.rating));
    const sqlDate = new Date(review.date);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
    }).format(sqlDate);

    return (
        <section className="border-l-2 border-yellow-400 p-1 mt-3">
            <div className="text-xs grid grid-cols-2 mb-1"><span>{formattedDate} </span> <span className="text-right">{hearts}</span> </div>
            <p className="text-xs ">{review.message}</p>
            <p className="text-sm mt-1">➖{review.user_name}</p>
        </section>
    );
}




export function ProductReviews({ reviews }: { reviews: Array<Review> }) {

    return (
        <div className="my-2">
            <h2 className="font-bold">Reviews for this product</h2>
            {reviews.map(review => <ReviewView review={review} key={review.id} />)}


        </div>
    )

}