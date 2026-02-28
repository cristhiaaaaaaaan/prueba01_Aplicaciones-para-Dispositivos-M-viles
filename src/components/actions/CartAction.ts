/**
 * CartAction.ts
 * Action creators del carrito de compras.
 * Cada función retorna un objeto de acción que es despachado al store de Redux.
 */

import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, CLEAR_CART, LOAD_CART } from './CartActionTypes';
import { Product, CartItem } from '../types';

// Agrega un producto al carrito. Si ya existe, el reducer incrementa su cantidad.
export const addToCartAction = (product: Product) => ({
    type: ADD_TO_CART,
    payload: product,
});

export const removeFromCartAction = (productId: number) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

// Si quantity llega a 0, el reducer elimina el producto automáticamente.
export const updateQuantityAction = (productId: number, quantity: number) => ({
    type: UPDATE_QUANTITY,
    payload: { productId, quantity },
});

// Vacía el carrito completo al pagar o cancelar la compra
export const clearCartAction = () => ({
    type: CLEAR_CART,
});

// Restaura un carrito previo guardado en localStorage al iniciar sesión
export const loadCartAction = (items: CartItem[]) => ({
    type: LOAD_CART,
    payload: items,
});
