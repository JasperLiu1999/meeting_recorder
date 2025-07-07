const fs = require('fs');
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function transcribe(buffer) {
  const tempPath = './uploads/temp.webm';
  fs.writeFileSync(tempPath, buffer);
  const resp = await openai.audio.transcriptions.create({
    file: fs.createReadStream(tempPath),
    model: 'whisper-1'
  });
  return resp.text;
}

module.exports = { transcribe };