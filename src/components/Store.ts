/**
 * Store.ts
 * Configuración del store global de Redux. Combina todos los reducers
 * de la aplicación y exporta la función que lo inicializa.
 */

import { combineReducers, legacy_createStore } from 'redux';
import CartReducer from './reducers/CartReducer';

const ConfigureStore = () => {
    const reducers = combineReducers({ Cart: CartReducer });
    const store = legacy_createStore(reducers);
    return store;
};

export default ConfigureStore;
