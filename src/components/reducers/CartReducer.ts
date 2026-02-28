/**
 * CartReducer.ts
 * Reducer del carrito de compras. Gestiona el estado de los artículos
 * respondiendo a cada acción despachada desde los componentes.
 */

import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, CLEAR_CART, LOAD_CART } from '../actions/CartActionTypes';
import { CartItem, Product } from '../types';

type CartState = {
    items: CartItem[];
};

const INITIAL_STATE: CartState = {
    items: [],
};

const CartReducer = (state: CartState = INITIAL_STATE, action: any): CartState => {
    switch (action.type) {

        case ADD_TO_CART: {
            const product: Product = action.payload;
            const existing = state.items.find(item => item.id === product.id);
            if (existing) {
                // Si el producto ya está en el carrito solo incrementa la cantidad
                return {
                    items: state.items.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item,
                    ),
                };
            }
            return {
                items: [...state.items, { ...product, quantity: 1 }],
            };
        }

        case REMOVE_FROM_CART:
            return {
                items: state.items.filter(item => item.id !== action.payload),
            };

        case UPDATE_QUANTITY: {
            const { productId, quantity } = action.payload;
            // Si la cantidad baja a 0 o menos, se elimina el producto del carrito
            if (quantity <= 0) {
                return {
                    items: state.items.filter(item => item.id !== productId),
                };
            }
            return {
                items: state.items.map(item =>
                    item.id === productId ? { ...item, quantity } : item,
                ),
            };
        }

        case CLEAR_CART:
            return INITIAL_STATE;

        case LOAD_CART:
            return { items: action.payload };

        default:
            return state;
    }
};

export default CartReducer;
