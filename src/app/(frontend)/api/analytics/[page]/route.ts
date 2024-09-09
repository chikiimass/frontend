import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_AURI || 'mongodb://localhost:27017/analytics', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Define schema and model
const analyticsSchema = new mongoose.Schema({
  page: String,
  timestamp: { type: Date, default: Date.now },
  userAgent: String,
  ip: String,
});

const Analytics = mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  if (req.method === 'POST') {
    const { page, userAgent, ip } = req.body;
    if (!page || !userAgent || !ip) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const view = new Analytics({ page, userAgent, ip });
    await view.save();
    return res.status(201).json({ message: 'View logged' });
  }

  if (req.method === 'GET') {
    const { page } = req.query;
    if (!page || typeof page !== 'string') {
      return res.status(400).json({ message: 'Invalid page' });
    }
    const views = await Analytics.find({ page });
    return res.json({ page, totalViews: views.length, views });
  }

  res.setHeader('Allow', ['POST', 'GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
