/**
 * Cart.tsx
 * Pantalla del carrito de compras. Muestra los productos agregados con su
 * precio individual, cantidad, subtotal y el gran total. Permite modificar
 * cantidades, eliminar productos, cancelar o confirmar el pago.
 * Cada cambio en los items se sincroniza automáticamente con localStorage.
 */

import React, { useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NativeLocalStorage from '../../localStorage/NativeLocalStorage';
import { CartItem, RootStackParamList } from '../components/types';
import {
    removeFromCartAction,
    updateQuantityAction,
    clearCartAction,
} from '../components/actions/CartAction';
import style_01 from '../styles/style_01';

type CartNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

interface CartProps {
    navigation: CartNavigationProp;
    Cart: { items: CartItem[] };
}

const Cart = ({ navigation, Cart: cartState }: CartProps) => {
    const dispatch = useDispatch();
    const { items } = cartState;

    // Persiste el carrito en localStorage cada vez que cambia el estado de Redux
    useEffect(() => {
        NativeLocalStorage?.setItem(JSON.stringify(items), 'cart');
    }, [items]);

    const grandTotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );

    const onRemove = (id: number) => {
        dispatch(removeFromCartAction(id));
    };

    /**
     * Actualiza la cantidad de un producto. Si llega a 0,
     * el reducer lo elimina automáticamente del carrito.
     */
    const onUpdateQty = (id: number, qty: number) => {
        dispatch(updateQuantityAction(id, qty));
    };

    const onCancel = () => {
        Alert.alert(
            'Cancelar Compra',
            '¿Está seguro que desea cancelar la compra?',
            [
                { text: 'No' },
                {
                    text: 'Sí, cancelar',
                    style: 'destructive',
                    onPress: () => {
                        dispatch(clearCartAction());
                        NativeLocalStorage?.setItem('[]', 'cart');
                        navigation.goBack();
                    },
                },
            ],
        );
    };

    const onPay = () => {
        if (items.length === 0) {
            Alert.alert('Carrito vacío', 'No hay productos en el carrito.');
            return;
        }
        Alert.alert(
            'Confirmar Pago',
            `Total a pagar: $${grandTotal.toFixed(2)}\n¿Desea confirmar el pago?`,
            [
                { text: 'Cancelar' },
                {
                    text: 'Pagar',
                    onPress: () => {
                        dispatch(clearCartAction());
                        NativeLocalStorage?.setItem('[]', 'cart');
                        Alert.alert('Pago Exitoso', '¡Gracias por su compra!', [
                            { text: 'OK', onPress: () => navigation.goBack() },
                        ]);
                    },
                },
            ],
        );
    };

    const renderItem = ({ item }: { item: CartItem }) => (
        <View style={style_01.cartItem}>
            <Image
                source={{ uri: item.image }}
                style={style_01.cartItemImage}
                resizeMode="contain"
            />
            <View style={style_01.cartItemInfo}>
                <Text style={style_01.cartItemTitle} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={style_01.cartItemPrice}>
                    Precio: ${item.price.toFixed(2)}
                </Text>
                <View style={style_01.qtyRow}>
                    <TouchableOpacity
                        style={style_01.qtyBtn}
                        onPress={() => onUpdateQty(item.id, item.quantity - 1)}>
                        <Text style={style_01.qtyBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={style_01.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity
                        style={style_01.qtyBtn}
                        onPress={() => onUpdateQty(item.id, item.quantity + 1)}>
                        <Text style={style_01.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                </View>
                <Text style={style_01.cartItemSubtotal}>
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </Text>
            </View>
            <TouchableOpacity style={style_01.removeBtn} onPress={() => onRemove(item.id)}>
                <Text style={style_01.removeBtnText}>✕</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={style_01.container}>

            {/* Header */}
            <View style={style_01.detailHeader}>
                <TouchableOpacity style={style_01.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={style_01.backBtnText}>← Atrás</Text>
                </TouchableOpacity>
                <Text style={style_01.detailHeaderTitle}>Carrito de Compras</Text>
                <View style={{ width: 60 }} />
            </View>

            {items.length === 0 ? (
                <View style={style_01.emptyCart}>
                    <Text style={style_01.emptyCartText}>El carrito está vacío 🛒</Text>
                </View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: 8 }}
                />
            )}

            {/* Total y botones de acción */}
            <View style={style_01.cartFooter}>
                <Text style={style_01.grandTotal}>
                    Total: ${grandTotal.toFixed(2)}
                </Text>
                <View style={style_01.cartBtnsRow}>
                    <TouchableOpacity style={style_01.cancelBtn} onPress={onCancel}>
                        <Text style={style_01.cancelBtnText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style_01.payBtn} onPress={onPay}>
                        <Text style={style_01.payBtnText}>Pagar</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
};

const mapStateToProps = ({ Cart }: any) => ({ Cart });

export default connect(mapStateToProps)(Cart);
