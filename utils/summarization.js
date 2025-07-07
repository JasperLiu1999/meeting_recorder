const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function summarize(text) {
  const resp = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Summarize this meeting transcript.' },
      { role: 'user', content: text }
    ]
  });
  return resp.choices[0].message.content;
}

module.exports = { summarize };