/**
 * Login.tsx
 * Pantalla de inicio de sesión. Autentica al usuario contra el API de FakeStore
 * y guarda el token y el username en el localStorage nativo al ingresar.
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Alert,
} from 'react-native';
import axios from 'axios';
import NativeLocalStorage from '../../localStorage/NativeLocalStorage';
import { BASEURL } from '../components/config/config';
import style_01 from '../styles/style_01';

interface LoginProps {
    onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    /**
     * Realiza la petición POST al API para autenticar al usuario.
     * Si tiene éxito, guarda el token y el username en localStorage y notifica al padre.
     */
    const handleLogin = async () => {
        if (!username || !password) {
            setError('Por favor ingrese usuario y contraseña.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`${BASEURL}/auth/login`, {
                username,
                password,
            });
            const { token } = response.data;
            NativeLocalStorage?.setItem(token, 'token');
            NativeLocalStorage?.setItem(username, 'username');
            onLogin();
        } catch (e) {
            setError('Credenciales incorrectas. Intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={style_01.loginContainer} keyboardShouldPersistTaps="handled">
            <View style={style_01.loginHeader}>
                <Text style={style_01.logoIcon}>⚛</Text>
                <Text style={style_01.loginTitle}>Fake Store</Text>
                <Text style={style_01.loginSubtitle}>Iniciar Sesión</Text>
            </View>
            <View style={style_01.loginForm}>
                <Text style={style_01.loginLabel}>Usuario</Text>
                <TextInput
                    style={style_01.loginInput}
                    placeholder="Ingrese su usuario"
                    value={username}
                    autoCapitalize="none"
                    onChangeText={text => setUsername(text)}
                />
                <Text style={style_01.loginLabel}>Contraseña</Text>
                <TextInput
                    style={style_01.loginInput}
                    placeholder="Ingrese su contraseña"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                {error ? <Text style={style_01.loginError}>{error}</Text> : null}
                {loading ? (
                    <ActivityIndicator size="large" color="#6B2D6B" style={{ marginTop: 28 }} />
                ) : (
                    <TouchableOpacity style={style_01.loginBtn} onPress={handleLogin}>
                        <Text style={style_01.loginBtnText}>Ingresar</Text>
                    </TouchableOpacity>
                )}
                <Text style={style_01.loginHint}>
                    Usuario de prueba: mor_2314 / 83r5^_
                </Text>
            </View>
        </ScrollView>
    );
};

export default Login;
