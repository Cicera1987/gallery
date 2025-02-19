'use client';

import React, { ReactNode } from "react"; // Adicione ReactNode aqui
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import { Provider } from "react-redux";
import { store } from "./store/store";

export default function ClientLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Provider store={store}>
                <Header />
                <main>{children}</main>
                <Footer />
            </Provider>
        </div>
    );
}
