"use client";

import Link, { LinkProps } from "next/link";

interface TextLinksProps extends LinkProps {
    texto: string;
    alt?: string;
}

export default function TextLink({ texto, href, ...rest }: TextLinksProps) {
    return (
        <Link href={href} {...rest}>
            <div className="text-2xl text-white no-underline text-left hover:text-red-400 transition-colors duration-200">
                {texto}
            </div>
        </Link>
    );
}
