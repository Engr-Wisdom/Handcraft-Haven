'use server'
import { Review } from "./definitions"
import { z } from 'zod'
import { revalidatePath } from "next/cache";
import { insertReview, isProductReviewedByUser } from "./data";
import { sleep } from "./utils";
import getSessionLocal from "./local-auth";

const FormReview = z.object({
    message: z.string(),
    rating: z.coerce.number().min(1, "Please select a rating").max(5),
    product_id: z.coerce.number(),
});
export type ReviewState = {
    errors?: {
        message?: string[];
        rating?: string[];
        product_id?: string[];
    };
    message?: string;
    success?: boolean;
    review_text?: string;
    inputs?: {
        message?: string;
    };
};
const CreateReview = FormReview;
export async function sendReview(
    prevState: ReviewState | null,
    formData: FormData
): Promise<ReviewState> {
    let user_id: number | undefined;
    user_id = await Number(getSessionLocal()) | 0;
    console.log("USER:" + user_id)
    if (user_id === 0) {
        return {
            success: false,
            message: 'Please Log In to Review.',
        }
    }
    const validatedFields = CreateReview.safeParse({
        message: formData.get('review-text'),
        rating: formData.get('rating'),
        product_id: formData.get('product_id'),
    });

    const isReview = await isProductReviewedByUser(user_id, validatedFields.data?.product_id || 0)
    if (isReview) {
        return {
            success: true,
            message: 'Product reviewed previously.',
        }
    }
    if (!validatedFields.success) {
        const flattened = z.flattenError(validatedFields.error);
        return {
            errors: flattened.fieldErrors,
            message: 'Missing Fields. Failed to Create Review.',
            inputs: {
                message: formData.get('review-text') as string | undefined
            }
        };
    } else {

        const { message, rating, product_id } = validatedFields.data;
        const insert = await insertReview(rating, product_id, user_id, message);
        revalidatePath(formData.get('product_url') as string || '/');
    }


    return {
        success: true,
        message: 'Review created successfully.',
    };
}