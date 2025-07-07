const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function translate(text, targetLang) {
  const resp = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: `Translate the following text into ${targetLang}.` },
      { role: 'user', content: text }
    ]
  });
  return resp.choices[0].message.content;
}

module.exports = { translate };