import { StorageState } from "@/store/standard/StorageState";

const endpointStorage = new StorageState({ key: 'blinkoEndpoint' });

export function getBlinkoEndpoint(path: string = ''): string {
    try {
        const isTauri = !!(window as any).isTauri || (typeof navigator !== 'undefined' && navigator.userAgent.includes('Tauri'));

        if (isTauri && endpointStorage.value) {
            try {
                const url = new URL(path, endpointStorage.value);
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
        endpointStorage.setValue(endpoint);
    }
}

export function getSavedEndpoint(): string {
    return endpointStorage.value || '';
}
