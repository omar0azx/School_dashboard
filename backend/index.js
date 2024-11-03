const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Firebase setup using environment variables
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Initialize Firestore

// CORS setup
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust according to your frontend port
    methods: ["POST"],
  })
);
app.use(express.json());

// Endpoint for user signup
app.post("/signup", async (req, res) => {
  console.log("Request body:", req.body);
  const { name, email, password, uid, schoolCode } = req.body; // Include schoolCode

  // Validate input
  if (
    !name ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.length < 6 ||
    !schoolCode
  ) {
    console.log("Validation failed:", { name, email, password, schoolCode });
    return res.status(400).send("Invalid name, email, or password.");
  }

  try {
    // Check if a user with the provided UID already exists
    // try {
    //   await admin.auth().getUser(uid);
    //   return res.status(400).json({ message: "User with this UID already exists." });
    // } catch (error) {
    //   if (error.code !== "auth/user-not-found") {
    //     return res.status(500).json({ message: "Error checking user: " + error.message });
    //   }
    // }

    // Hash password
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user data object
    const newUser = {
      name, // Include name
      email,
      password: hashedPassword, // Store hashed password
      uid, // Store UID from Firebase Auth
      schoolCode, // Save the school code here
    };
    console.log("Attempting to save new user data to Firestore:", newUser);

    // Save user document to Firestore
    // const userRef = await db.collection("users").add(newUser);
    // console.log("User saved successfully with ID:", userRef.id);

    // Check if the school code exists in the 'schools' collection
    const schoolRef = db.collection("schools").doc(schoolCode);
    const schoolDoc = await schoolRef.get();

    if (schoolDoc.exists) {
      // School exists, now create or add user data to school_officials subcollection
      const schoolOfficialsRef = schoolRef.collection("school_officials");
      await schoolOfficialsRef.add({
        // userId: userRef.id,
        name: newUser.name,
        email: newUser.email,
        schoolCode: newUser.schoolCode,
        uid: newUser.uid,
      });
      console.log("User data saved to school_officials subcollection.");
    } else {
      console.log("School code not found:", schoolCode);
      return res.status(400).send("School code not found.");
    }

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Server error" });
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
