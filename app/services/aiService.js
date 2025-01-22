import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getOutfitSuggestions(items, weather, occasion) {
  if (!process.env.GEMINI_API_KEY) {
    console.error('Gemini API key is not configured');
    return generateBasicSuggestions(items, weather, occasion);
  }

  try {
    // Format items for better prompt
    const formattedItems = items.map(item => ({
      category: item.category,
      color: item.color,
      brand: item.brand
    }));

    const prompt = `As a fashion expert, create 3 outfit combinations using these items:
      ${JSON.stringify(formattedItems)}.
      Weather: ${weather.condition}, ${weather.temperature}°C
      Occasion: ${occasion}
      Return a JSON array with 3 outfit suggestions.
      Each suggestion should have:
      - items: array of selected clothing
      - reasoning: string explaining why this combination works
      Response must be valid JSON only.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonStr = text.replace(/```json\n?|\n?```/g, '').trim();
    const suggestions = JSON.parse(jsonStr);

    return suggestions;

  } catch (error) {
    console.error('AI Service Error:', error);
    return generateBasicSuggestions(items, weather, occasion);
  }
}

// Fallback function for basic suggestions
function generateBasicSuggestions(items, weather, occasion) {
  const tops = items.filter(item => item.category === 'tops');
  const bottoms = items.filter(item => item.category === 'bottoms');
  const shoes = items.filter(item => item.category === 'shoes');

  const suggestions = [];

  // Generate up to 3 basic combinations
  for (let i = 0; i < 3; i++) {
    if (tops[i] && bottoms[i] && shoes[i]) {
      suggestions.push({
        items: [tops[i], bottoms[i], shoes[i]],
        reasoning: `Basic combination suitable for ${occasion} in ${weather.condition} weather.`
      });
    }
  }

  return suggestions;
} 