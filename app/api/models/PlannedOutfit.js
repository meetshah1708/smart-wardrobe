// models/PlannedOutfit.js
import mongoose from 'mongoose';

const PlannedOutfitSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // Format: YYYY-MM-DD
  outfit: {
    top: { type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem' },
    bottom: { type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem' },
    shoe: { type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem' },
  },
});

export default mongoose.models.PlannedOutfit || mongoose.model('PlannedOutfit', PlannedOutfitSchema);