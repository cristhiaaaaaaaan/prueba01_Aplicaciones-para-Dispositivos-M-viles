/**
 * App.tsx
 * Componente raíz de la aplicación. Maneja la sesión del usuario
 * verificando el token guardado localmente y configura la navegación con Redux.
 */

import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import ConfigureStore from './src/components/Store';
import { loadCartAction } from './src/components/actions/CartAction';
import NativeLocalStorage from './localStorage/NativeLocalStorage';

import Login from './src/views/Login';
import Home from './src/views/Home';
import ProductDetail from './src/views/ProductDetail';
import Cart from './src/views/Cart';

const Stack = createNativeStackNavigator();

// El store se crea fuera del componente para no recrearlo en cada render
const store = ConfigureStore();

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Al iniciar la app se verifica si hay una sesión activa guardada localmente
    React.useEffect(() => {
        const token = NativeLocalStorage?.getItem('token');
        // getItem retorna el string "null" cuando no existe, por eso la doble verificación
        if (token && token !== 'null' && token.length > 0) {
            const savedCart = NativeLocalStorage?.getItem('cart');
            if (savedCart && savedCart !== 'null' && savedCart !== '[]') {
                try {
                    const items = JSON.parse(savedCart);
                    store.dispatch(loadCartAction(items));
                } catch (e) {
                    console.error('Error al cargar el carrito:', e);
                }
            }
            setIsLoggedIn(true);
        }
    }, []);

    if (!isLoggedIn) {
        return (
            <View style={{ flex: 1 }}>
                <Login onLogin={() => setIsLoggedIn(true)} />
            </View>
        );
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="ProductDetail" component={ProductDetail} />
                    <Stack.Screen name="Cart" component={Cart} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
