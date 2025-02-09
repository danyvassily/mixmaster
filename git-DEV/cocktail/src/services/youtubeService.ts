import axios from 'axios';

interface YouTubeSearchResult {
  videoId: string;
  title: string;
  thumbnailUrl: string;
}

export class YouTubeService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor() {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      throw new Error('YOUTUBE_API_KEY is not defined in environment variables');
    }
    this.apiKey = apiKey;
  }

  async searchCocktailVideo(cocktailName: string): Promise<YouTubeSearchResult | null> {
    try {
      const searchQuery = `Comment faire un ${cocktailName} cocktail`;
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: {
          part: 'snippet',
          q: searchQuery,
          key: this.apiKey,
          maxResults: 1,
          type: 'video',
          relevanceLanguage: 'fr',
        },
      });

      if (response.data.items && response.data.items.length > 0) {
        const video = response.data.items[0];
        return {
          videoId: video.id.videoId,
          title: video.snippet.title,
          thumbnailUrl: video.snippet.thumbnails.high.url,
        };
      }

      return null;
    } catch (error) {
      console.error('Erreur lors de la recherche YouTube:', error);
      return null;
    }
  }

  getVideoUrl(videoId: string): string {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
} 