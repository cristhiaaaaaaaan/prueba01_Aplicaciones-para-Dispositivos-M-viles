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

    const loadCategories = async () => {
        try {
            const response = await axios.get(`${BASEURL}/products/categories`);
            setCategories(['all', ...response.data]);
        } catch (e) {
            console.error(e);
        }
    };

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

            {/* Categorías */}
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

            {/* Productos */}
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

            {/* Footer */}
            <View style={style_01.footer}>
                <Text style={style_01.footerTitle}>{EXAM_TITLE}</Text>
                <Text style={style_01.footerSubText}>Desarrollada por:</Text>
                <Text style={style_01.footerName}>{STUDENT_NAME}</Text>
            </View>

        </SafeAreaView>
    );
};

const mapStateToProps = ({ Cart }: any) => ({ Cart });

export default connect(mapStateToProps)(Home);
