// pages/api/plan.js
import dbConnect from '../../utils/db';
import PlannedOutfit from '../../models/PlannedOutfit';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { date, outfit } = req.body;

  await dbConnect();

  try {
    let planned = await PlannedOutfit.findOne({ date });

    if (planned) {
      // Update existing
      planned.outfit = outfit;
    } else {
      // Create new
      planned = new PlannedOutfit({ date, outfit });
    }

    await planned.save();
    res.status(200).json({ message: 'Outfit planned successfully', planned });
  } catch (error) {
    res.status(500).json({ error: 'Failed to plan outfit' });
  }
}