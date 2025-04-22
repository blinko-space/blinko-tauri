import { StorageState } from "@/store/standard/StorageState";

export function getBlinkoEndpoint(path: string = ''): string {
    try {
        const blinkoEndpoint = window.localStorage.getItem('blinkoEndpoint')
        const isTauri = !!(window as any).__TAURI__;

        if (isTauri && blinkoEndpoint) {
            try {
                const url = new URL(path, blinkoEndpoint);
                return url.toString();
            } catch (error) {
                console.error(error);
                return path;
            }
        }

        return path;
    } catch (error) {
        console.error(error);
        return path;
    }
}

export function saveBlinkoEndpoint(endpoint: string): void {
    if (endpoint) {
        window.localStorage.setItem('blinkoEndpoint', endpoint);
    }
}

export function getSavedEndpoint(): string {
    return window.localStorage.getItem('blinkoEndpoint') || '';
}
