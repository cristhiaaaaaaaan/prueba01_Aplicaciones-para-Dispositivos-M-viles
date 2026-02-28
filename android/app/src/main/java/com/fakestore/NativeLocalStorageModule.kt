package com.fakestore

import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext

/**
 * NativeLocalStorageModule.kt
 * Implementación nativa en Android del módulo NativeLocalStorage.
 * Usa SharedPreferences para guardar datos de forma persistente en el dispositivo.
 * Se utiliza para almacenar el token de sesión, el username y el carrito de compras.
 *
 * Nota: setItem recibe (value, key) para coincidir con las llamadas desde JavaScript.
 */
class NativeLocalStorageModule(reactContext: ReactApplicationContext) :
    NativeLocalStorageSpec(reactContext) {

    override fun getName() = NAME

    override fun setItem(value: String, key: String) {
        val sharedPref =
            getReactApplicationContext().getSharedPreferences("localSP", Context.MODE_PRIVATE)
        val editor = sharedPref.edit()
        editor.putString(key, value)
        editor.apply()
    }

    // Retorna "null" como string cuando no existe la clave,
    // por eso en App.tsx se verifica token !== 'null'
    override fun getItem(key: String): String? {
        val sharedPref =
            getReactApplicationContext().getSharedPreferences("localSP", Context.MODE_PRIVATE)
        val value = sharedPref.getString(key, null)
        return value.toString()
    }

    override fun removeItem(key: String) {
        val sharedPref =
            getReactApplicationContext().getSharedPreferences("localSP", Context.MODE_PRIVATE)
        val editor = sharedPref.edit()
        editor.remove(key)
        editor.apply()
    }

    override fun clear() {
        val sharedPref =
            getReactApplicationContext().getSharedPreferences("localSP", Context.MODE_PRIVATE)
        val editor = sharedPref.edit()
        editor.clear()
        editor.apply()
    }

    companion object {
        const val NAME = "NativeLocalStorage"
    }
}
