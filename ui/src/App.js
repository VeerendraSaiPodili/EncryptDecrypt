import React, { useState } from "react";

const API_URL = "http://localhost:5000";

function App() {
  const [text, setText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEncrypt = async () => {
    try {
      const response = await fetch(`${API_URL}/encrypt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (response.ok) {
        setEncryptedText(data.encrypted);
        setDecryptedText(""); // Reset decrypted text
        setErrorMessage(""); // Clear any previous error message
      } else {
        setErrorMessage("Encryption failed: " + data.error);
      }
    } catch (error) {
      setErrorMessage("Encryption error!");
    }
  };

  const handleDecrypt = async () => {
    try {
      const response = await fetch(`${API_URL}/decrypt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ encryptedText }),
      });

      const data = await response.json();
      if (response.ok) {
        setDecryptedText(data.decrypted);
        setErrorMessage(""); // Clear any previous error message
      } else {
        setErrorMessage("Decryption failed: " + data.error);
      }
    } catch (error) {
      setErrorMessage("Decryption error!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Encryption and Decryption</h2>

      <div>
        <input
          type="text"
          placeholder="Enter text to encrypt"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleEncrypt}>Encrypt</button>
      </div>

      {encryptedText && (
        <div>
          <h4>Encrypted Text:</h4>
          <textarea readOnly value={encryptedText} />
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="Enter encrypted text"
          value={encryptedText}
          onChange={(e) => setEncryptedText(e.target.value)}
        />
        <button onClick={handleDecrypt}>Decrypt</button>
      </div>

      {decryptedText && (
        <div>
          <h4>Decrypted Text:</h4>
          <textarea readOnly value={decryptedText} />
        </div>
      )}

      {errorMessage && (
        <div style={{ color: "red" }}>
          <h4>Error:</h4>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default App;
