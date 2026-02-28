/**
 * Home.tsx
 * Pantalla principal (pasarela de productos). Carga el catálogo desde el API
 * con Axios y permite filtrar por categoría. Muestra el badge del carrito
 * con la cantidad de artículos agregados usando el estado de Redux.
 */

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { BASEURL, STUDENT_NAME, EXAM_TITLE } from '../components/config/config';
import { Product, RootStackParamList } from '../components/types';
import style_01 from '../styles/style_01';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeProps {
    navigation: HomeNavigationProp;
    Cart: { items: any[] };
}

const Home = ({ navigation, Cart }: HomeProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategories();
        loadProducts(null);
    }, []);

    /** Obtiene las categorías del API y agrega "all" al inicio */
    const loadCategories = async () => {
        try {
            const response = await axios.get(`${BASEURL}/products/categories`);
            setCategories(['all', ...response.data]);
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * Carga productos del API. Si se pasa una categoría usa el endpoint de filtrado,
     * si no, trae todos los productos disponibles.
     */
    const loadProducts = async (category: string | null) => {
        setLoading(true);
        try {
            const url =
                category && category !== 'all'
                    ? `${BASEURL}/products/category/${category}`
                    : `${BASEURL}/products`;
            const response = await axios.get(url);
            setProducts(response.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const onSelectCategory = (category: string) => {
        setSelectedCategory(category);
        loadProducts(category === 'all' ? null : category);
    };

    const onPressProduct = (product: Product) => {
        navigation.navigate('ProductDetail', { product });
    };

    // Total de artículos para el badge del carrito
    const cartCount = Cart.items.reduce((sum, item) => sum + item.quantity, 0);

    const renderProduct = ({ item }: { item: Product }) => (
        <TouchableOpacity style={style_01.productCard} onPress={() => onPressProduct(item)}>
            <Image
                source={{ uri: item.image }}
                style={style_01.productImage}
                resizeMode="contain"
            />
            <Text style={style_01.productTitle} numberOfLines={2}>
                {item.title}
            </Text>
            <Text style={style_01.productPrice}>${item.price.toFixed(2)}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={style_01.container}>

            {/* Header */}
            <View style={style_01.header}>
                <View style={style_01.headerLeft}>
                    <Text style={style_01.headerLogoIcon}>⚛</Text>
                    <Text style={style_01.headerTitle}>Fake Store</Text>
                </View>
                <TouchableOpacity
                    style={style_01.cartBtn}
                    onPress={() => navigation.navigate('Cart')}>
                    <Text style={style_01.cartBtnText}>🛒</Text>
                    {cartCount > 0 && (
                        <View style={style_01.cartBadge}>
                            <Text style={style_01.cartBadgeText}>{cartCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Filtro de categorías */}
            <View style={style_01.categoryContainer}>
                <Text style={style_01.categoryLabel}>Categoría:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categories.map(cat => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                style_01.categoryBtn,
                                selectedCategory === cat && style_01.categoryBtnActive,
                            ]}
                            onPress={() => onSelectCategory(cat)}>
                            <Text
                                style={[
                                    style_01.categoryBtnText,
                                    selectedCategory === cat && style_01.categoryBtnTextActive,
                                ]}>
                                {cat === 'all' ? 'Todos' : cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#6B2D6B" style={{ flex: 1 }} />
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    renderItem={renderProduct}
                    contentContainerStyle={{ padding: 8 }}
                />
            )}

            {/* Footer con información del examen */}
            <View style={style_01.footer}>
                <Text style={style_01.footerTitle}>{EXAM_TITLE}</Text>
                <Text style={style_01.footerSubText}>Desarrollada por:</Text>
                <Text style={style_01.footerName}>{STUDENT_NAME}</Text>
            </View>

        </SafeAreaView>
    );
};

// Se conecta al store de Redux para leer el estado del carrito
const mapStateToProps = ({ Cart }: any) => ({ Cart });

export default connect(mapStateToProps)(Home);
