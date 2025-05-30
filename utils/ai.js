const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({ apiKey: process.env.OPENAI_KEY });
const openai = new OpenAIApi(config);

async function generateMessages(prompt) {
  const res = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Generate 3 marketing messages for: ${prompt}`,
    max_tokens: 150
  });
  return res.data.choices[0].text.trim();
}

module.exports = { generateMessages };
