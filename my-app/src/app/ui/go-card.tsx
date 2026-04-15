'use client'
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function GoCard({ url, text }: { url: string, text: Array<string> }) {
    const router = useRouter();
    return <li className="col-span-2 lg:col-span-1">
        <Link
            href={url}
            className="group relative flex h-full min-h-[350px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition-all hover:border-solid hover:border-orange-500 hover:bg-white hover:shadow-xl"
        >
            {/* Background Decorative Element */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-100/50 transition-transform group-hover:scale-150" />


            {/* Text Content */}
            <h3 className="text-xl font-bold text-slate-900">
                {text[0]}
            </h3>
            <p className="mt-2 max-w-[150px] text-sm text-slate-500">
                {text[1]}
            </p>
        </Link>
    </li>
}