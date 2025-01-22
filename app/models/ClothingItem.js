import mongoose from 'mongoose';

const ClothingItemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Please specify the category'],
    enum: ['tops', 'bottoms', 'shoes', 'accessories']
  },
  color: {
    type: String,
    required: [true, 'Please specify the color']
  },
  brand: {
    type: String
  },
  image: {
    type: String,
    required: [true, 'Please provide an image']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.ClothingItem || mongoose.model('ClothingItem', ClothingItemSchema); 