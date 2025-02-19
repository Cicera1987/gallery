"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "../store/store";
import { fetchCats } from "../store/features/gallerySlice";
import Image from "next/image";

export default function Gallery() {
    const dispatch = useDispatch <AppDispatch>();
    const { cats, loading } = useSelector((state: RootState) => state.gallery);

    useEffect(() => {
        dispatch(fetchCats());
    }, [dispatch]);

    if (loading) return <p className="text-center text-xl">Carregando...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Galeria de Gatos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cats.map((cat) => (
                    <div
                        key={cat.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                        <Image width="300px" height="600px" src={cat.image} alt={cat.name} className="w-full h-60 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl text-gray-500 font-semibold">{cat.name}</h2>
                            <p className="text-gray-600">{cat.breed}</p>
                            <p className="text-gray-500">Idade: {cat.age} anos</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
