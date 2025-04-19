interface SpotifyConfig {
    consumer: {
        key: string;
        secret: string;
    };
}
export declare class SpotifyClient {
    private token;
    private config;
    constructor(config: SpotifyConfig);
    private getToken;
    getCoverArt(artist: string, title: string): Promise<string>;
    private getTrackCover;
    private getArtistImage;
    private search;
}
export {};
