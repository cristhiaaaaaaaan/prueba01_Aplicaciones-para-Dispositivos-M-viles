import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, CLEAR_CART, LOAD_CART } from './CartActionTypes';
import { Product, CartItem } from '../types';

export const addToCartAction = (product: Product) => ({
    type: ADD_TO_CART,
    payload: product,
});

export const removeFromCartAction = (productId: number) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const updateQuantityAction = (productId: number, quantity: number) => ({
    type: UPDATE_QUANTITY,
    payload: { productId, quantity },
});

export const clearCartAction = () => ({
    type: CLEAR_CART,
});

export const loadCartAction = (items: CartItem[]) => ({
    type: LOAD_CART,
    payload: items,
});
