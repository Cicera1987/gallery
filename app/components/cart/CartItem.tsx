import { Product } from '../../types/Tipos';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

// estas interfaces foi uma gambiarra
interface CartItem {
  product: Product;
  quantity: number;
}

interface Props {
  item: CartItem;
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export default function CartItem({ item, onRemove, onUpdateQuantity }: Props) {
  return (
    <li className="flex items-center justify-between py-3 px-4 border-b border-gray-200 hover:bg-gray-50 transition duration-300">
      <div className="flex-grow"> 
        <h3 className="text-lg font-medium text-gray-800">{item.product.name}</h3>
        <p className="text-gray-600 text-sm">R${item.product.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center space-x-2"> 
        <button
          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300 transition duration-300"
        >
          <FaMinus />
        </button>
        <span className="text-gray-700 font-medium">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
          className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-300"
        >
          <FaPlus />
        </button>
      </div>

      <button onClick={() => onRemove(item.product.id)} className="text-red-800 hover:text-red-700 transition duration-300 pl-2">
        <FaTrash />
      </button>
    </li>
  );
}