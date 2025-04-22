import { platform } from '@tauri-apps/plugin-os'

/**
 * isAndroid
 * @returns wether the platform is android
 */
export function isAndroid() {
    try {
        console.log(platform(),'xxxxxxxxxxxxx')
        return platform() === 'android';
    } catch (error) {
        console.log(error,'xxxxxxxxxxxxx')
        return false
    }
}

export function isInTauri() {
    try {
        // @ts-ignore
        return typeof window !== 'undefined' && window.__TAURI__ !== undefined;
    } catch (error) {
        return false
    }
}
