import { Product } from "@/app/types/Tipos";

interface CartItem {
  product: Product;
  quantity: number;
}

interface Props {
  items: CartItem[]; 
}

export default function CartTotal({ items }: Props) {
  
  const total = Array.isArray(items)
    ? items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    : 0; 
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          Total: R$ {total.toFixed(2)}
        </h3>

        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}