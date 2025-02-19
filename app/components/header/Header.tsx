"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import NavBar from "../navBar/NavBar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export default function Header() {
    const cartQuantity = useSelector((state: RootState) =>
        state.cart.items.reduce((total: number, item: { quantity: number; }) => total + item.quantity, 0)
    );

    return (
        <header className="bg-red-800 py-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-red-400 font-bold text-xl">
                    <span className="text-white">React</span> Redux RTK
                </div>
                <NavBar />
                <div className="relative text-white mr-4 cursor-pointer p-2 rounded-full hover:bg-red-900">
                    <Link href="/carrinho" legacyBehavior>
                        <a className="relative flex">
                            <FaShoppingCart size={26} />
                            {cartQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                                    {cartQuantity}
                                </span>
                            )}
                        </a>
                    </Link>
                </div>
            </div>
        </header>
    );
}