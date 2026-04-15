'use client'
import { sendReview } from "@/app/lib/actions"
import { RatingSelector } from "./RatingSelector";
import { Product } from "@/app/lib/definitions";
import { useActionState } from "react";
export default function FormReview({ name, product, url }: { name: string, product: Product, url: string }) {
    const [state, formAction, isPending] = useActionState(sendReview, null);
    return <div className={`${state?.success && "hidden"} border-t-2 mt-5`}>

        <h3 className="font-bold text-1xl ">Leave a review</h3>
        <form action={formAction} className={`grid p-2 `}>
            <label className="font-bold m-1 ">
                Author:
                <input type="text" disabled name="name" className="ml-1 " value={name} />
            </label>
            <RatingSelector />
            {state?.errors?.rating && (
                <span className="block bg-red-200 font-bold p-1 mb-2">{state.errors.rating[0]}</span>
            )}
            <textarea rows={4} defaultValue={state?.inputs?.message && state.inputs.message} name="review-text" placeholder="How was your experience?" className="border-1 border-black/10 p-1" id="review-text"></textarea>
            <input type="hidden" name="product_url" id="product_url" value={url} />
            <input type="hidden" name="product_id" id="product_id" value={product.id} />
            <input disabled={isPending} type="submit" className="disabled:animate-pulse bg-white border-1 w-full font-bold hover:bg-blue-50  px-4 py-2 rounded mt-2" value={isPending ? "Sending...." : "Send review"} />
        </form>
    </div>
}




