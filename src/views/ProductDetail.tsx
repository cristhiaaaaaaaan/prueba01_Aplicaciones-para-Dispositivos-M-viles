/**
 * ProductDetail.tsx
 * Pantalla de detalle de un producto. Muestra toda la información del producto
 * recibido por parámetros de navegación y permite agregarlo al carrito con Redux.
 */

import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../components/types';
import { addToCartAction } from '../components/actions/CartAction';
import style_01 from '../styles/style_01';

type ProductDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

interface ProductDetailProps {
    navigation: ProductDetailNavigationProp;
    route: ProductDetailRouteProp;
}

const ProductDetail = ({ navigation, route }: ProductDetailProps) => {
    const { product } = route.params;
    const dispatch = useDispatch();

    /**
     * Despacha la acción para agregar el producto al carrito.
     * Si el producto ya existe, el reducer incrementa su cantidad.
     */
    const onAddToCart = () => {
        dispatch(addToCartAction(product));
        Alert.alert(
            'Carrito',
            `"${product.title}" agregado al carrito.`,
            [
                { text: 'Seguir comprando', onPress: () => navigation.goBack() },
                { text: 'Ver carrito', onPress: () => navigation.navigate('Cart') },
            ],
        );
    };

    return (
        <SafeAreaView style={style_01.container}>

            {/* Header */}
            <View style={style_01.detailHeader}>
                <TouchableOpacity style={style_01.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={style_01.backBtnText}>← Atrás</Text>
                </TouchableOpacity>
                <Text style={style_01.detailHeaderTitle}>Detalle del Producto</Text>
                <TouchableOpacity
                    style={style_01.cartBtnHeader}
                    onPress={() => navigation.navigate('Cart')}>
                    <Text style={style_01.cartBtnText}>🛒</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Image
                    source={{ uri: product.image }}
                    style={style_01.detailImage}
                    resizeMode="contain"
                />
                <Text style={style_01.detailCategory}>{product.category}</Text>
                <Text style={style_01.detailTitle}>{product.title}</Text>
                <Text style={style_01.detailPrice}>${product.price.toFixed(2)}</Text>
                <Text style={style_01.detailDescription}>{product.description}</Text>
                {/* El rating es opcional en la respuesta del API */}
                {product.rating && (
                    <Text style={style_01.detailRating}>
                        ⭐ {product.rating.rate} ({product.rating.count} reseñas)
                    </Text>
                )}
            </ScrollView>

            <TouchableOpacity style={style_01.addToCartBtn} onPress={onAddToCart}>
                <Text style={style_01.addToCartBtnText}>Agregar al Carrito 🛒</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

export default ProductDetail;
