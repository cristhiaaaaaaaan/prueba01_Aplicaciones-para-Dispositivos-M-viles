/**
 * types.ts
 * Definición de tipos TypeScript compartidos entre los componentes,
 * reducers y action creators de la aplicación.
 */

// Estructura de un producto tal como lo devuelve el API de FakeStore
export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

// Extiende Product agregando la cantidad seleccionada en el carrito
export type CartItem = Product & {
    quantity: number;
};

// Rutas y parámetros del stack de navegación de React Navigation
export type RootStackParamList = {
    Home: undefined;
    ProductDetail: { product: Product };
    Cart: undefined;
};
