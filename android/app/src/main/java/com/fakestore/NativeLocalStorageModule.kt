package com.fakestore

import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext

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
