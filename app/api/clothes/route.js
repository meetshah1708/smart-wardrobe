// pages/api/clothes.js
import dbConnect from '../../utils/db';
import ClothingItem from '../../models/ClothingItem';

export default async function handler(req, res) {
  const { category, color } = req.query;

  await dbConnect();

  try {
    const query = {};
    if (category) query.category = category;
    if (color) query.color = color;

    const clothes = await ClothingItem.find(query);
    res.status(200).json({ clothes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clothes' });
  }
}