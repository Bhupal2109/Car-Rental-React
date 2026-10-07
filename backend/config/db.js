import mongoose from 'mongoose';
import process from 'node:process';

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error('MongoDB connection failed: MONGODB_URI is not configured.');
    throw new Error('MONGODB_URI is not configured.');
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed. Check MONGODB_URI and database availability.');
    throw error;
  }
};