const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
const PORT = 5000;
const SECRET_KEY = crypto.createHash('sha256').update('my_secret_key').digest('base64').substr(0, 32);

app.use(cors());
app.use(bodyParser.json());

// Encryption API
app.post("/encrypt", (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), Buffer.alloc(16, 0));
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    res.json({ encrypted });
  } catch (error) {
    console.error("Encryption error:", error); // Log the error for debugging
    res.status(500).json({ error: "Encryption failed" });
  }
});

app.post("/decrypt", (req, res) => {
  try {
    const { encryptedText } = req.body;
    if (!encryptedText) return res.status(400).json({ error: "Encrypted text is required" });

    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), Buffer.alloc(16, 0));
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    res.json({ decrypted });
  } catch (error) {
    console.error("Decryption error:", error); 
    res.status(500).json({ error: "Decryption failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});