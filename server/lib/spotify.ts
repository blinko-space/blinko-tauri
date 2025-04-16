import axios from 'axios';
import { getWithProxy, postWithProxy } from './proxy';

interface SpotifyConfig {
  consumer: {
    key: string;
    secret: string;
  };
}

interface SpotifyTrack {
  name: string;
  preview_url: string | null;
  album?: {
    name: string;
    images?: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  artists?: Array<{
    id: string;
    name: string;
  }>;
}

interface SpotifyArtist {
  id: string;
  name: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
}

interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
  };
}

interface SpotifyArtistSearchResponse {
  artists: {
    items: SpotifyArtist[];
  };
}

export class SpotifyClient {
  private token: string = '';
  private config: SpotifyConfig;

  constructor(config: SpotifyConfig) {
    this.config = config;
  }

  private async getToken(): Promise<string> {
    if (this.token) return this.token;

    const auth = Buffer.from(`${this.config.consumer.key}:${this.config.consumer.secret}`).toString('base64');

    try {
      const response = await postWithProxy('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
        config: {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      });

      this.token = response.data.access_token;
      return this.token;
    } catch (error) {
      console.error('Failed to get Spotify token:', error);
      throw error;
    }
  }

  async getCoverArt(artist: string, title: string): Promise<string> {
    try {
      // console.log('Searching on Spotify:', { artist, title });

      // 1. Try to get track cover first
      const trackCoverUrl = await this.getTrackCover(artist, title);
      if (trackCoverUrl) {
        return trackCoverUrl;
      }

      // 2. If no track cover found, try to get artist image
      // console.log('No track cover found, trying artist image');
      const artistImageUrl = await this.getArtistImage(artist);
      if (artistImageUrl) {
        // console.log('Found artist image');
        return artistImageUrl;
      }

      // console.log('No images found');
      return '';
    } catch (error) {
      console.error('Spotify search error:', error);
      return '';
    }
  }

  private async getTrackCover(artist: string, title: string): Promise<string> {
    try {
      const response = await this.search({
        type: 'track',
        query: `artist:"${artist}" track:"${title}"`,
        limit: 10,
      });

      if (!response.tracks.items.length) {
        return '';
      }

      // Find the best matching track
      const tracks = response.tracks.items;
      const matchedTrack = tracks.find((track) => track.name.toLowerCase() === title.toLowerCase() && track.artists?.some((a) => a.name.toLowerCase() === artist.toLowerCase())) || tracks[0];

      return matchedTrack?.album?.images?.[0]?.url || '';
    } catch (error) {
      console.error('Failed to get track cover:', error);
      return '';
    }
  }

  private async getArtistImage(artist: string): Promise<string> {
    try {
      const token = await this.getToken();
      const response: { data: SpotifyArtistSearchResponse } = await getWithProxy('https://api.spotify.com/v1/search', {
        config: {
          params: {
            q: artist,
            type: 'artist',
            limit: 1,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      const artists = response.data.artists.items;
      if (!artists.length) {
        return '';
      }

      return artists[0]?.images[0]?.url || '';
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        this.token = '';
        return this.getArtistImage(artist);
      }
      console.error('Failed to get artist image:', error);
      return '';
    }
  }

  private async search(params: { type: 'track' | 'artist'; query: string; limit?: number }): Promise<SpotifySearchResponse> {
    const token = await this.getToken();

    try {
      const response: { data: SpotifySearchResponse } = await getWithProxy('https://api.spotify.com/v1/search', {
        config: {
          params: {
            q: params.query,
            type: params.type,
            limit: params.limit || 1,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        this.token = '';
        return this.search(params);
      }
      throw error;
    }
  }
}
