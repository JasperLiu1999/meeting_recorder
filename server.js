require('dotenv').config();

const express = require('express');
const multer = require('multer');
const { transcribe } = require('./utils/transcription');
const { summarize } = require('./utils/summarization');
const { translate } = require('./utils/translation');

const app = express();
const upload = multer();
const PORT = process.env.PORT || 4000;

app.post('/api/process', upload.single('audio'), async (req, res) => {
  try {
    const transcript = await transcribe(req.file.buffer);
    const summary = await summarize(transcript);
    const translation = await translate(transcript, req.body.targetLang);
    res.json({ transcript, summary, translation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Processing failed' });
  }
});

app.listen(PORT, () => console.log('Listening on port ' + PORT));