const tokenizer = require('gpt-tokenizer');

module.exports = async (req, res) => {
  const fullText = req.body.text;

  // Encodes text to array of tokens
  const tokens = await tokenizer.encode(fullText);

  // Decodes tokens to text in chunks of 500 tokens
  var chunks = [];
   
  for (let i =0; i < tokens.length; i+=500) {
    const chunk = tokens.slice(i, i + 500);
    const decodedChunk = await tokenizer.decode(chunk);
    chunks.push(decodedChunk);
  }

  res.status(200).json({  summary: chunks });

};