import fs from "fs";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bars = [
  {
    name: "frequence",
    url: "https://media.timeout.com/images/105875151/750/422/image.jpg",
  },
  {
    name: "danico",
    url: "https://media.timeout.com/images/105875152/750/422/image.jpg",
  },
  {
    name: "cambridge",
    url: "https://media.timeout.com/images/105875153/750/422/image.jpg",
  },
  {
    name: "andy-wahloo",
    url: "https://media.timeout.com/images/105875154/750/422/image.jpg",
  },
  {
    name: "bluebird",
    url: "https://images.pexels.com/photos/2403391/pexels-photo-2403391.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "monsieur-antoine",
    url: "https://media.timeout.com/images/105875156/750/422/image.jpg",
  },
  {
    name: "divine",
    url: "https://media.timeout.com/images/105875157/750/422/image.jpg",
  },
  {
    name: "little-red-door",
    url: "https://media.timeout.com/images/105875123/750/422/image.jpg",
  },
  {
    name: "le-syndicat",
    url: "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "candelaria",
    url: "https://images.pexels.com/photos/2531186/pexels-photo-2531186.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "combat",
    url: "https://images.pexels.com/photos/3566120/pexels-photo-3566120.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "sherry-butt",
    url: "https://images.pexels.com/photos/1283216/pexels-photo-1283216.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "bisou",
    url: "https://images.pexels.com/photos/2531189/pexels-photo-2531189.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "comptoir-general",
    url: "https://images.pexels.com/photos/1322184/pexels-photo-1322184.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "lulu-white",
    url: "https://images.pexels.com/photos/2531187/pexels-photo-2531187.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "mezcaleria",
    url: "https://images.pexels.com/photos/2531188/pexels-photo-2531188.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "perchoir-marais",
    url: "https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "drama",
    url: "https://images.pexels.com/photos/3566121/pexels-photo-3566121.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "tiger",
    url: "https://images.pexels.com/photos/1283220/pexels-photo-1283220.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "vieux-carre",
    url: "https://images.pexels.com/photos/2531190/pexels-photo-2531190.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "lavomatic",
    url: "https://images.pexels.com/photos/3566122/pexels-photo-3566122.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "dirty-dick",
    url: "https://images.pexels.com/photos/2531191/pexels-photo-2531191.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "moonshiner",
    url: "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "cafe-moderne",
    url: "https://images.pexels.com/photos/2531192/pexels-photo-2531192.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "bonhomie",
    url: "https://images.pexels.com/photos/1322185/pexels-photo-1322185.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(__dirname, "../public/images/bars", filename);
    const file = fs.createWriteStream(filepath);

    https
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            Referer: "https://www.timeout.com/",
          },
        },
        (response) => {
          // Gérer les redirections
          if (response.statusCode === 301 || response.statusCode === 302) {
            const newUrl = response.headers.location;
            file.close();
            downloadImage(newUrl, filename).then(resolve).catch(reject);
            return;
          }

          if (response.statusCode !== 200) {
            file.close();
            fs.unlink(filepath, () => {
              reject(new Error(`HTTP Status ${response.statusCode}`));
            });
            return;
          }

          response.pipe(file);
          file.on("finish", () => {
            file.close();
            console.log(`Downloaded: ${filename}`);
            resolve();
          });
        }
      )
      .on("error", (err) => {
        fs.unlink(filepath, () => {
          console.error(`Error downloading ${filename}:`, err.message);
          reject(err);
        });
      });
  });
};

async function downloadAllImages() {
  try {
    // Créer le dossier s'il n'existe pas
    const imagesDir = path.join(__dirname, "../public/images/bars");
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    for (const bar of bars) {
      try {
        await downloadImage(bar.url, `${bar.name}.jpg`);
        // Attendre un peu entre chaque téléchargement pour éviter d'être bloqué
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (error) {
        console.error(
          `Failed to download image for ${bar.name}:`,
          error.message
        );
      }
    }
    console.log("All images downloaded successfully!");
  } catch (error) {
    console.error("Error downloading images:", error);
  }
}

downloadAllImages();
