import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserByID } from "./data";

export default async function getSessionLocal(): Promise<number> {
    const cookieStore = await cookies();
    const user_id = (cookieStore.get("user_id")?.value ?? "0") as string;
    return parseInt(user_id, 10) || 0;
}

export async function validateLogin() {
    const id_user = await getSessionLocal();
    if (id_user == 0) {
        redirect("/login");
    }
    const user = await getUserByID(id_user);
    return user;
}