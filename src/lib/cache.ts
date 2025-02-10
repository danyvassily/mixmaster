import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export async function getFromCache<T>(key: string): Promise<T | null> {
  try {
    const cached = await redis.get(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error('Erreur lors de la récupération du cache:', error);
    return null;
  }
}

export async function setInCache<T>(key: string, data: T, expirationInSeconds = 3600): Promise<void> {
  try {
    await redis.setex(key, expirationInSeconds, JSON.stringify(data));
  } catch (error) {
    console.error('Erreur lors de la mise en cache:', error);
  }
}

export async function invalidateCache(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch (error) {
    console.error('Erreur lors de l\'invalidation du cache:', error);
  }
}

export const CACHE_KEYS = {
  COCKTAILS_LIST: 'cocktails:list',
  COCKTAIL_DETAIL: (id: string) => `cocktail:${id}`,
  CATEGORIES: 'cocktails:categories'
}; 