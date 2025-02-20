
export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Props {
    product: Product;
}

export type TaskForm = {
    id: string;
    title: string;
    description: string;
    status: "backlog" | "Em andamento" | "concluído";
}

export interface TaskFormEdit {
    title: string;
    description: string;
}

