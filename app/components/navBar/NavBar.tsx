"use client";

import TextLink from "../text/TextLink";


export default function NavBar() {
    return (
        <>
            <nav className="h-20 flex items-center justify-between px-4 gap-8">
                <TextLink texto="Home" href="/" />
                <TextLink texto="Galeria" href="/gallery" />
                <TextLink texto="Loja" href="/loja" />
                <TextLink texto="Documentos" href="/documents" />
            </nav>
        </>
    );
}
