import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 32) / 2;

const morado = '#6B2D6B';
const morado_claro = '#9B59B6';
const blanco = '#FFFFFF';
const gris_claro = '#F5F5F5';
const gris = '#CCCCCC';
const texto_oscuro = '#333333';
const naranja = '#FFA500';
const verde = '#28A745';
const rojo = '#DC3545';

const style_01 = StyleSheet.create({

    // ── LOGIN ──────────────────────────────────────────
    loginContainer: {
        flex: 1,
        backgroundColor: blanco,
    },
    loginHeader: {
        backgroundColor: morado,
        paddingVertical: 50,
        alignItems: 'center',
    },
    logoIcon: {
        fontSize: 52,
        color: blanco,
        marginBottom: 8,
    },
    loginTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        color: blanco,
    },
    loginSubtitle: {
        fontSize: 16,
        color: '#DDD',
        marginTop: 6,
    },
    loginForm: {
        padding: 24,
        flex: 1,
    },
    loginLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: morado,
        marginBottom: 4,
        marginTop: 16,
    },
    loginInput: {
        borderColor: morado,
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: texto_oscuro,
        backgroundColor: blanco,
    },
    loginBtn: {
        backgroundColor: morado,
        borderRadius: 8,
        padding: 14,
        alignItems: 'center',
        marginTop: 28,
    },
    loginBtnText: {
        color: blanco,
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginHint: {
        marginTop: 16,
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    loginError: {
        color: rojo,
        textAlign: 'center',
        marginTop: 12,
        fontSize: 14,
        fontWeight: 'bold',
    },

    // ── HOME HEADER ────────────────────────────────────
    header: {
        backgroundColor: blanco,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: gris,
        elevation: 3,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerLogoIcon: {
        fontSize: 28,
        color: morado_claro,
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: morado,
    },
    cartBtn: {
        padding: 8,
    },
    cartBtnText: {
        fontSize: 24,
    },
    cartBadge: {
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: rojo,
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBadgeText: {
        color: blanco,
        fontSize: 10,
        fontWeight: 'bold',
    },

    // ── CATEGORIES ─────────────────────────────────────
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: gris,
        backgroundColor: blanco,
    },
    categoryLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: texto_oscuro,
        marginRight: 8,
    },
    categoryBtn: {
        borderColor: gris,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginRight: 8,
        backgroundColor: blanco,
    },
    categoryBtnActive: {
        backgroundColor: morado,
        borderColor: morado,
    },
    categoryBtnText: {
        fontSize: 12,
        color: texto_oscuro,
        textTransform: 'capitalize',
    },
    categoryBtnTextActive: {
        color: blanco,
        fontWeight: 'bold',
    },

    // ── PRODUCTS GRID ──────────────────────────────────
    productCard: {
        backgroundColor: blanco,
        borderRadius: 10,
        margin: 4,
        padding: 10,
        width: cardWidth,
        alignItems: 'center',
        elevation: 3,
    },
    productImage: {
        width: cardWidth - 20,
        height: 120,
        marginBottom: 8,
    },
    productTitle: {
        fontSize: 12,
        color: texto_oscuro,
        textAlign: 'center',
        marginBottom: 4,
        lineHeight: 16,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: morado,
    },

    // ── FOOTER ─────────────────────────────────────────
    footer: {
        backgroundColor: morado,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    footerTitle: {
        color: naranja,
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerSubText: {
        color: '#DDD',
        fontSize: 12,
        marginTop: 2,
    },
    footerName: {
        color: blanco,
        fontSize: 13,
        fontWeight: 'bold',
    },

    // ── DETAIL HEADER ──────────────────────────────────
    detailHeader: {
        backgroundColor: morado,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    backBtn: {
        padding: 6,
    },
    backBtnText: {
        color: blanco,
        fontSize: 16,
    },
    detailHeaderTitle: {
        color: blanco,
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    cartBtnHeader: {
        padding: 6,
    },

    // ── PRODUCT DETAIL ─────────────────────────────────
    detailImage: {
        width: '100%',
        height: 260,
        marginBottom: 16,
        backgroundColor: gris_claro,
    },
    detailCategory: {
        fontSize: 12,
        color: morado_claro,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 6,
    },
    detailTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: texto_oscuro,
        marginBottom: 10,
        lineHeight: 26,
    },
    detailPrice: {
        fontSize: 28,
        fontWeight: 'bold',
        color: morado,
        marginBottom: 14,
    },
    detailDescription: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
        textAlign: 'justify',
        marginBottom: 14,
    },
    detailRating: {
        fontSize: 14,
        color: '#888',
        marginBottom: 16,
    },
    addToCartBtn: {
        backgroundColor: morado,
        marginHorizontal: 16,
        marginVertical: 16,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
    },
    addToCartBtnText: {
        color: blanco,
        fontSize: 18,
        fontWeight: 'bold',
    },

    // ── CART ───────────────────────────────────────────
    cartItem: {
        backgroundColor: blanco,
        borderRadius: 10,
        marginBottom: 8,
        padding: 10,
        flexDirection: 'row',
        elevation: 2,
        alignItems: 'center',
    },
    cartItemImage: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
    cartItemInfo: {
        flex: 1,
    },
    cartItemTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: texto_oscuro,
        marginBottom: 4,
        lineHeight: 16,
    },
    cartItemPrice: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    qtyBtn: {
        backgroundColor: morado,
        width: 26,
        height: 26,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyBtnText: {
        color: blanco,
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 22,
    },
    qtyText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: texto_oscuro,
        minWidth: 24,
        textAlign: 'center',
    },
    cartItemSubtotal: {
        fontSize: 13,
        fontWeight: 'bold',
        color: morado,
        marginTop: 4,
    },
    removeBtn: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeBtnText: {
        color: rojo,
        fontSize: 20,
        fontWeight: 'bold',
    },
    emptyCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
    },
    cartFooter: {
        backgroundColor: gris_claro,
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: gris,
        elevation: 5,
    },
    grandTotal: {
        fontSize: 22,
        fontWeight: 'bold',
        color: morado,
        textAlign: 'right',
        marginBottom: 12,
    },
    cartBtnsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelBtn: {
        backgroundColor: rojo,
        borderRadius: 8,
        padding: 14,
        flex: 1,
        marginRight: 8,
        alignItems: 'center',
    },
    cancelBtnText: {
        color: blanco,
        fontSize: 16,
        fontWeight: 'bold',
    },
    payBtn: {
        backgroundColor: verde,
        borderRadius: 8,
        padding: 14,
        flex: 1,
        marginLeft: 8,
        alignItems: 'center',
    },
    payBtnText: {
        color: blanco,
        fontSize: 16,
        fontWeight: 'bold',
    },

    // ── SHARED ─────────────────────────────────────────
    container: {
        flex: 1,
        backgroundColor: gris_claro,
    },
});

export default style_01;
