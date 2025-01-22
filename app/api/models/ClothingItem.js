// models/ClothingItem.js
import mongoose from 'mongoose';

const ClothingItemSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['tops', 'bottoms', 'shoes', 'accessories'],
    required: true,
  },
  color: String,
  brand: String,
  image: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // if using authentication
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ClothingItem || mongoose.model('ClothingItem', ClothingItemSchema);