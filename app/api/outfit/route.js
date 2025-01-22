// pages/api/outfits.js
import dbConnect from '../../utils/db';
import ClothingItem from '../../models/ClothingItem';

export default async function handler(req, res) {
  const { weather, occasion } = req.query; // e.g., weather='cold', occasion='formal'

  await dbConnect();

  // Fetch clothes based on weather or occasion
  // This is a simplified example
  try {
    const tops = await ClothingItem.find({ category: 'tops' });
    const bottoms = await ClothingItem.find({ category: 'bottoms' });
    const shoes = await ClothingItem.find({ category: 'shoes' });

    // Simple combination logic
    const outfits = [];
    tops.forEach((top) => {
      bottoms.forEach((bottom) => {
        shoes.forEach((shoe) => {
          outfits.push({ top, bottom, shoe });
        });
      });
    });

    // You can add filtering based on weather or occasion here

    res.status(200).json({ outfits });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch outfits' });
  }
}