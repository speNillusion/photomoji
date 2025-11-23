import { ParseRequest, ParseResponse } from '../types';

// Use relative path to leverage Vite proxy and avoid CORS issues
const API_URL = '/api/parse';

export const sendParseRequest = async (text: string): Promise<string> => {
  try {
    const payload: ParseRequest = { word: text };

    console.log(`Attempting to fetch from: ${API_URL} with payload:`, payload);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Accept': 'application/json', // Sometimes required by certain backends
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}):`, errorText);
      throw new Error(`Server responded with ${response.status}: ${errorText || 'Unknown error'}`);
    }

    const data: any = await response.json();

    // Try to find the text content in common properties
    const resultText = data.texto ;

    return resultText;
  } catch (error) {
    console.error('Network request failed:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while communicating with the server.');
  }
};
