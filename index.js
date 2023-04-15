const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const OPENAI_API_KEY = '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';

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle POST requests to generate AI response
app.post('/generate', express.json(), async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: req.body.text,
      max_tokens: 60,
      n: 1,
      stop: '\n',
      temperature: 0.5,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
    });
    res.send(response.data.choices[0].text);
  } catch (error) {
    console.error(error);
    res.send('Error generating AI response');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
