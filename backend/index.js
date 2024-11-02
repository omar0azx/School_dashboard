const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Firebase setup
const serviceAccount = require("./firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors());
app.use(express.json());

// Signup endpoint
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email.includes("@") || password.length < 6) {
    return res.status(400).json({ error: "Invalid email or password length." });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.code === "auth/email-already-exists") {
      return res.status(400).json({ error: "Email already in use." });
    }
    res.status(500).json({ error: "Server error" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await admin.auth().getUserByEmail(email);
    res
      .status(200)
      .json({ message: `Login successful for user: ${userCredential.uid}` });
  } catch (error) {
    console.error("Error logging in:", error);
    if (
      error.code === "auth/user-not-found" ||
      error.code === "auth/wrong-password"
    ) {
      return res.status(400).json({ error: "Invalid email or password." });
    }
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
