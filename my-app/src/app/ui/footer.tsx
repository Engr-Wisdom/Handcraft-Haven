import { siteConfig } from "../constants/site";
import Logo from "./logo";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    const { name } = siteConfig;
    const now = new Date();
    const year = now.getFullYear();
    return <>
        <footer className="bg-amber-800 text-white text-sm">
            <div className="grid grid-cols-1 min-[440px]:grid-cols-2 pt-5 ">
                <section id="seccion-one" className="mx-auto px-10">
                    <div className="flex items-center gap-2 ">
                        <Image
                            src="/images/logo.png"
                            alt={name + " logo"}
                            width={40}
                            height={40}

                        />
                        <Link href={"/"} className="font-bold">{name}</Link>
                    </div>
                    <p className="mt-3">From strategy to execution, we craft digital solutions that move your business forward.</p>
                    <ul className="flex mt-2 gap-2 font-bold">
                        <li><Link href={"/"}>Home</Link></li>
                        <li><Link href={"/products"}>Products</Link></li>
                        <li><Link href={"/about"}>About</Link></li>
                        <li><Link href={"/contact"}>Contact</Link></li>
                    </ul>

                </section>
                <section className="mx-auto px-10 grid grid-cols-2 min-[440px]:grid-cols-1 min-[440px]:mt-0 mt-6 items-center ">
                    <span className="font-bold mb-2 block">About</span>
                    <ul>
                        <li>
                            <Link href={"./about"}>About</Link>
                        </li>
                        <li>
                            Delivery Information
                        </li>
                        <li>
                            Privacy Policy
                        </li>
                        <li>
                            Terms & Conditions
                        </li>
                        <li>
                            <Link href={"./contact"}>Contact US</Link>
                        </li>
                    </ul>
                </section>
            </div>

            <div className="border-t border-gray-300 my-8"></div>
            <div><p className="flex justify-center pb-4">© {year} {name}. All rights reserved.</p></div>
        </footer>
    </>
}

export default Footer;