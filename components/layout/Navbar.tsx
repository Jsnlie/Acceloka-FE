"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar(){
    const pathName = usePathname();
    const linkStyle = (path: string) =>
        pathName === path ? "text-[#948D55] font-semibold" : "text-white hover:text-[#948D55]"

    return(
        <nav className="sticky top-0  z-[100] flex justify-between  px-6 py-4 bg-black shadow-md">
            <h1 className="text-2xl text-[#948D55] font-extrabold">Acceloka</h1>

            <div className="flex gap-6 justify text-xl">
                <Link href="/" className={linkStyle("/")}>Home</Link>
                <Link href="/tickets" className={linkStyle("/tickets")}>Explore</Link>
                <Link href="/booked-tickets" className={linkStyle("/booked-tickets")}>My Bookings</Link>
            </div>
        </nav>
    );
}
