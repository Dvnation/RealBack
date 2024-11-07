const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const starter = async (res, message) => {
  // Placeholder for your starter function logic
};

app.get('/search', (req, res) => {
  res.send("working fine");
  console.log("working fine");
});

app.post('/search', async (req, res) => {
  const query = req.body.query;

  // Make sure to include error handling
  try {
    // Create the GoogleGenerativeAI client
    const genAI = new GoogleGenerativeAI('AIzaSyDlNrRL9y1fZEtNjOt0M22qK0vDiJaWvJY');
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = query;

    if (query !== " ") {
      // Handle the API call with try-catch to manage errors
      try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text().replace(/\*\*/g, ''));
        return res.json({ messages: result.response.text().replace(/\*\*/g, '') });
      } catch (apiError) {
        console.error("Error in generating content:", apiError);
        return res.status(500).json({ error: "Failed to generate content. Please check your internet connection or try again later." });
      }
    } else {
      res.status(404).send({ Error: 'Item not found' });
    }
  } catch (error) {
    // Catch any other unexpected errors
    console.error("Error occurred:", error);
    return res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0',  () => {
  console.log(`Server is running on port ${PORT}`);
});
