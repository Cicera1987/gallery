'use client';

import { Product } from '../../types/Tipos';
import ProductCard from '../product/ProductCard';


export default function Loja() {
  const products: Product[] = [
    { id: 1, name: "Arranhador para Gatos", price: 129.99, image: "/arranhador.webp" },
    { id: 2, name: "Cama para Gatos", price: 100.98, image: "/cama-gato.webp" },
    { id: 3, name: "Brinquedo Interativo", price: 139.33, image: "/branquedo.webp" },
    { id: 4, name: "Fonte de Água", price: 129.99, image: "/fonte-agua.webp" },
    { id: 5, name: "Areia Sanitária", price: 158.98, image: "/areia-sanitaria.webp" },
    { id: 6, name: "Ração Premium", price: 245.99, image: "/racao.webp" },
    { id: 7, name: "Petisco Natural", price: 119.99, image: "/petisco-natural.webp" },
    { id: 8, name: "Coleira com Pingente", price: 119.99, image: "/coleira-gato.webp" },
    { id: 9, name: "Túnel para Gatos", price: 119.99, image: "/tunel_interativo.webp" },
  ];


  return (
    <>
      <section className="container mx-auto p-4 bg-gray-400 font-sans">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-100">O Melhor para seus Gatos</h1>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-80 rounded-lg p-4 text-gray-700 overflow-hidden shadow-md transition duration-300 hover:scale-105 hover:shadow-lg bg-white"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}