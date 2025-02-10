import puppeteer from "puppeteer";
import mongoose from "mongoose";
import path from "path";
import { promises as fs } from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Importer le modèle Cocktail
import Cocktail from "../models/Cocktail.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function downloadImage(url, cocktailName) {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const fileName = `${cocktailName.toLowerCase().replace(/\s+/g, "-")}.jpg`;
    const filePath = path.join(process.cwd(), "public", "cocktails", fileName);

    await fs.writeFile(filePath, Buffer.from(buffer));
    return `/cocktails/${fileName}`;
  } catch (error) {
    console.error(
      `Erreur lors du téléchargement de l'image pour ${cocktailName}:`,
      error
    );
    return "";
  }
}

async function parseIngredients(ingredientsText) {
  const ingredients = [];
  const lines = ingredientsText.split("\n").filter((line) => line.trim());

  for (const line of lines) {
    const match = line
      .trim()
      .match(
        /^([\d.,/]+)?\s*(cl|ml|g|oz|cuillère[s]? à (?:café|soupe)|trait[s]?|feuille[s]?|tranche[s]?)?\s*(.+)$/i
      );

    if (match) {
      const [, quantity = "1", unit = "", name] = match;
      ingredients.push({
        name: name.trim(),
        quantity: quantity.trim(),
        unit: unit.trim() || "unité",
      });
    }
  }
  return ingredients;
}

async function scrapeCocktails() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connecté à MongoDB");

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Page principale des recettes
    console.log("Accès à la page principale...");
    await page.goto("https://www.destinationcocktails.fr/recettes-cocktails/");

    // Récupérer tous les liens des cocktails
    console.log("Récupération des liens des cocktails...");
    const cocktailLinks = await page.evaluate(() => {
      const links = Array.from(
        document.querySelectorAll('a[href*="/recettes-cocktails/"]')
      );
      return links
        .map((link) => link.href)
        .filter(
          (href) =>
            href.includes("/recettes-cocktails/") &&
            !href.includes("/page/") &&
            href !== "https://www.destinationcocktails.fr/recettes-cocktails/"
        );
    });

    console.log(`Nombre de cocktails trouvés: ${cocktailLinks.length}`);

    for (const link of cocktailLinks) {
      try {
        console.log(`Traitement du cocktail: ${link}`);
        await page.goto(link);
        await page.waitForSelector(".entry-title");

        const cocktailData = await page.evaluate(() => {
          const name =
            document.querySelector(".entry-title")?.textContent?.trim() || "";
          const description =
            document.querySelector(".entry-content p")?.textContent?.trim() ||
            "";
          const imageUrl =
            document.querySelector(".wp-post-image")?.getAttribute("src") || "";
          const ingredients = Array.from(
            document.querySelectorAll(".ingredient-list li")
          )
            .map((li) => li.textContent?.trim())
            .filter((text) => text)
            .join("\n");
          const instructions = Array.from(
            document.querySelectorAll(".preparation-steps li")
          )
            .map((li) => li.textContent?.trim())
            .filter((text) => text)
            .join("\n");

          return { name, description, imageUrl, ingredients, instructions };
        });

        // Télécharger l'image
        console.log(`Téléchargement de l'image pour ${cocktailData.name}...`);
        const imagePath = await downloadImage(
          cocktailData.imageUrl,
          cocktailData.name
        );

        // Parser les ingrédients
        console.log(`Parsing des ingrédients pour ${cocktailData.name}...`);
        const parsedIngredients = await parseIngredients(
          cocktailData.ingredients
        );

        // Mettre à jour ou créer le cocktail dans la base de données
        console.log(
          `Mise à jour de la base de données pour ${cocktailData.name}...`
        );
        await Cocktail.findOneAndUpdate(
          { name: cocktailData.name },
          {
            name: cocktailData.name,
            ingredients: parsedIngredients,
            instructions: cocktailData.instructions,
            description: cocktailData.description,
            image: imagePath,
            category: "Classique",
            isCustom: false,
            isAlcoholic: true,
          },
          { upsert: true, new: true }
        );

        console.log(`Cocktail traité avec succès: ${cocktailData.name}`);
      } catch (error) {
        console.error(`Erreur lors du traitement d'un cocktail:`, error);
      }
    }

    await browser.close();
    await mongoose.disconnect();
    console.log("Scraping terminé avec succès");
  } catch (error) {
    console.error("Erreur lors du scraping:", error);
    process.exit(1);
  }
}

scrapeCocktails();
