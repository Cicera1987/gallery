import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, CartItem } from "@/app/types/Tipos";


const initialState = {
    items: [] as CartItem[],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(
                (item) => item.product.id === action.payload.id
            );
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ product: action.payload, quantity: 1 });
            }
        },

        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.product.id !== action.payload
            );
        },
        
        updateQuantity: (state, action: PayloadAction<{productId: number; quantity: number }>) => {
            const item = state.items.find(
                (item) => item.product.id === action.payload.productId
            );

            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
    },

});


export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;