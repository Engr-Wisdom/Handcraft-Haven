import { cookies } from "next/headers";
export default async function getSessionLocal(): Promise<number> {
    const cookieStore = await cookies();
    const user_id = (cookieStore.get("user_id")?.value ?? "0") as string;
    return parseInt(user_id, 10) || 0;
}