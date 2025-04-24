export function getBlinkoEndpoint(path: string = ''): string {
    try {
        const blinkoEndpoint = window.localStorage.getItem('blinkoEndpoint')
        console.log('blinkoEndpointfrom localStorage', blinkoEndpoint);
        const isTauri = !!(window as any).__TAURI__;
        console.log('isTauri', isTauri);
        if (isTauri && blinkoEndpoint) {
            try {
                const url = new URL(path, blinkoEndpoint.replace(/"/g, ''));
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

export function isTauriAndEndpointUndefined(): boolean {
    const isTauri = !!(window as any).__TAURI__;
    const blinkoEndpoint = window.localStorage.getItem('blinkoEndpoint')
    return isTauri && !blinkoEndpoint;
}

export function saveBlinkoEndpoint(endpoint: string): void {
    if (endpoint) {
        window.localStorage.setItem('blinkoEndpoint', endpoint);
    }
}

export function getSavedEndpoint(): string {
    return window.localStorage.getItem('blinkoEndpoint') || '';
}
