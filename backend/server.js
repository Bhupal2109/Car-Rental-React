import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import process from 'node:process';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`AutoRent API is running on http://localhost:${port}`);
    });
  } catch {
    console.error('AutoRent API startup aborted because MongoDB connection failed.');
    process.exitCode = 1;
  }
};

startServer();