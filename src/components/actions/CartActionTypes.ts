/**
 * CartActionTypes.ts
 * Constantes para los tipos de acciones del carrito.
 * Centralizar estos valores evita errores de tipeo en el reducer y los action creators.
 */

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
// Acción para restaurar el carrito guardado en localStorage al iniciar la app
export const LOAD_CART = 'LOAD_CART';
