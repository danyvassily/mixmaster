import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { Bar } from '@/models/Bar';

const SOURCES = [
  {
    url: 'https://www.timeout.fr/paris/bars/meilleurs-bars-cocktails-paris',
    scraper: async (page: puppeteer.Page) => {
      return await page.evaluate(() => {
        const items = document.querySelectorAll('article');
        return Array.from(items).map((item) => {
          const nameElement = item.querySelector('h3');
          const descElement = item.querySelector('p');
          const imgElement = item.querySelector('img');
          const addressElement = item.querySelector('.listing_address');
          
          return {
            name: nameElement ? nameElement.textContent?.trim() : '',
            description: descElement ? descElement.textContent?.trim() : '',
            imageUrl: imgElement ? imgElement.getAttribute('src') : '',
            address: addressElement ? addressElement.textContent?.trim() : '',
          };
        });
      });
    }
  },
  {
    url: 'https://www.lebonbon.fr/paris/bars/meilleurs-bars-cocktails-paris/',
    scraper: async (page: puppeteer.Page) => {
      return await page.evaluate(() => {
        const items = document.querySelectorAll('.article-card');
        return Array.from(items).map((item) => {
          const nameElement = item.querySelector('h2');
          const descElement = item.querySelector('.description');
          const imgElement = item.querySelector('img');
          const addressElement = item.querySelector('.address');
          
          return {
            name: nameElement ? nameElement.textContent?.trim() : '',
            description: descElement ? descElement.textContent?.trim() : '',
            imageUrl: imgElement ? imgElement.getAttribute('src') : '',
            address: addressElement ? addressElement.textContent?.trim() : '',
          };
        });
      });
    }
  }
];

async function getGeocode(address: string) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address + ', Paris, France'
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    
    if (data.results && data.results[0]) {
      return data.results[0].geometry.location;
    }
    return null;
  } catch (error) {
    console.error('Erreur de géocodage:', error);
    return null;
  }
}

export async function GET() {
  try {
    const browser = await puppeteer.launch({
      headless: 'new'
    });
    
    const bars: Bar[] = [];
    const processedNames = new Set(); // Pour éviter les doublons

    for (const source of SOURCES) {
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      try {
        await page.goto(source.url, {
          waitUntil: 'networkidle0',
          timeout: 30000
        });

        const barsData = await source.scraper(page);

        for (const barData of barsData) {
          if (barData.name && !processedNames.has(barData.name)) {
            processedNames.add(barData.name);

            const coordinates = barData.address ? await getGeocode(barData.address) : null;
            
            const specialities = [
              'Cocktails signatures',
              'Cocktails classiques',
              'Mixologie moléculaire',
              'Gin',
              'Whisky',
              'Rhum'
            ];
            
            const bar: Bar = {
              id: Math.random().toString(36).substr(2, 9),
              name: barData.name,
              description: barData.description || 'Un bar unique à Paris',
              address: barData.address || 'Paris',
              openingHours: '18h00 - 02h00',
              imageUrl: barData.imageUrl || '/images/default-bar.jpg',
              speciality: specialities[Math.floor(Math.random() * specialities.length)],
              priceRange: ['€€', '€€€', '€€€€'][Math.floor(Math.random() * 3)],
              rating: Math.floor(Math.random() * 2) + 3, // Note entre 3 et 5
              coordinates: coordinates || undefined,
              features: [
                'Terrasse',
                'Réservation conseillée',
                'Happy Hour',
                'Cocktails sur mesure'
              ].slice(0, Math.floor(Math.random() * 4) + 1)
            };

            bars.push(bar);
          }
        }
      } catch (error) {
        console.error(`Erreur lors du scraping de ${source.url}:`, error);
      } finally {
        await page.close();
      }
    }

    await browser.close();
    
    return NextResponse.json(bars);
  } catch (error) {
    console.error('Erreur lors du scraping des bars:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
} 