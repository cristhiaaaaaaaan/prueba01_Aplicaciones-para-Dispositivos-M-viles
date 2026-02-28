/**
 * NativeLocalStorage.tsx
 * Especificación del módulo nativo NativeLocalStorage usando TurboModules
 * (nueva arquitectura de React Native). Define la interfaz que debe implementar
 * el módulo nativo en Android (NativeLocalStorageModule.kt), el cual usa
 * SharedPreferences para el almacenamiento persistente en el dispositivo.
 */

import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
}

// El nombre 'NativeLocalStorage' debe coincidir con getName() en el módulo nativo
export default TurboModuleRegistry.getEnforcing<Spec>('NativeLocalStorage');
