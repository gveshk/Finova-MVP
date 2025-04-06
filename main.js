// Function to call Gemini API
const apiKey = 'AIzaSyBqy2e7T4zVSYoGGcag8Sv7xZ-jALPaGW8'; // Replace with your actual API key
const modelId = 'gemini-2.0-flash'; // Replace with your desired model
const generateContentApi = 'generateContent';

async function getGeminiResponse(message) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:${generateContentApi}?key=${apiKey}`;

  const requestBody = {
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": message
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Extract the text from the response
    if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
      const responseText = result.candidates[0].content.parts[0].text;
      return responseText;
    } else {
      throw new Error("Unexpected response format from Gemini API");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
