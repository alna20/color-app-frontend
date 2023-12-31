export const API_URL_GET = 'https://a2li335nw6ip36xv2jqh5dod5y0violw.lambda-url.us-east-1.on.aws/all-colors';
export const API_URL_POST = 'https://a2li335nw6ip36xv2jqh5dod5y0violw.lambda-url.us-east-1.on.aws/submit-color';

export function calculateColorFrequency(colorList) {
    const colorFrequencyMap = {};
  
    // Count the occurrences of each color
    colorList.forEach((item) => {
      const colorName = item.colorName;
      colorFrequencyMap[colorName] = (colorFrequencyMap[colorName] || 0) + 1;
    });
  
    // Create a new list with colorName and colorFrequency
    const result = Object.entries(colorFrequencyMap).map(([colorName, colorFrequency]) => ({
      colorName,
      colorFrequency,
    }));
  
    return result;
}