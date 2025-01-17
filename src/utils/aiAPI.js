import axios from "axios";

const API_KEY = process.env.OPENAI_API_KEY;

export const analyzeText = async (text) => {
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      model: "text-davinci-003",
      prompt: `Summarize the following text:\n\n${text}`,
      max_tokens: 100,
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.choices[0].text.trim();
};
