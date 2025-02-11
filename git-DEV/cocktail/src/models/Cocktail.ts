import mongoose, { Schema, Document } from 'mongoose';

export interface ICocktail extends Document {
  name: string;
  ingredients: Array<{
    name: string;
    quantity: string;
    unit: string;
  }>;
  instructions: string;
  category: string;
  image?: string;
  isCustom: boolean;
  description?: string;
  glassType?: string;
  isAlcoholic?: boolean;
  youtube?: {
    videoId: string;
    title: string;
    thumbnailUrl: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CocktailSchema = new Schema<ICocktail>(
  {
    name: {
      type: String,
      required: [true, 'Le nom du cocktail est requis'],
      unique: true,
    },
    ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        unit: { type: String, required: true },
      },
    ],
    instructions: {
      type: String,
      required: [true, 'Les instructions sont requises'],
    },
    category: {
      type: String,
      required: [true, 'La catégorie est requise'],
    },
    image: {
      type: String,
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
    glassType: {
      type: String,
    },
    isAlcoholic: {
      type: Boolean,
      default: true,
    },
    youtube: {
      videoId: String,
      title: String,
      thumbnailUrl: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Cocktail || mongoose.model<ICocktail>('Cocktail', CocktailSchema); 