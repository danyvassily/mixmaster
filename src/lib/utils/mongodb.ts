import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://dany:azerty@cluster0.ujnql73.mongodb.net/cocktails';

if (!MONGODB_URI) {
  throw new Error('Veuillez définir l\'URI MongoDB dans les variables d\'environnement');
}

async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) {
      return mongoose.connections[0];
    }

    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });

    return mongoose.connections[0];
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    throw error;
  }
}

export default connectDB; 