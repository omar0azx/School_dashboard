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

// Endpoint for schoolCode checking
app.post("/validate-school", async (req, res) => {
  const { schoolCode } = req.body;

  // Check if the school code exists in the 'schools' collection
  try {
    const schoolRef = db.collection("schools").doc(schoolCode);
    const schoolDoc = await schoolRef.get();

    if (schoolDoc.exists) {
      return res.status(200).json({ message: "School code is valid" });
    } else {
      return res.status(400).json({ error: "School code not found" });
    }
  } catch (error) {
    console.error("Error checking school code:", error);
    return res
      .status(500)
      .json({ error: "Server error while checking school code" });
  }
});

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

// Endpoint for fetching user info by email
app.get("/profile/:email", async (req, res) => {
  const { email } = req.params;

  try {
    // Step 1: Search across all schools to find the user by email
    const schoolsRef = db.collection("schools");
    const querySnapshot = await schoolsRef.get();

    let userData = null;
    let schoolCode = null;

    for (const doc of querySnapshot.docs) {
      const schoolOfficialsRef = doc.ref.collection("school_officials");
      const userSnapshot = await schoolOfficialsRef
        .where("email", "==", email)
        .get();

      if (!userSnapshot.empty) {
        schoolCode = doc.id; // Found the schoolCode
        userData = userSnapshot.docs[0].data(); // Get user data
        break;
      }
    }

    if (!userData) {
      return res.status(404).json({ error: "User not found." });
    }

    // Step 2: Return the user data with the dynamic schoolCode
    res.status(200).json({ ...userData, schoolCode });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Endpoint for updating user profile
app.post("/updateProfile", async (req, res) => {
  const { email, name, phone, location } = req.body; // Get details from request body

  // Prepare the update data
  const updateData = {
    ...(name !== undefined && { name }),
    ...(phone !== undefined && { phone }),
    ...(location !== undefined && { location }),
  };

  try {
    // Step 1: Search across all schools to find the user by email
    const schoolsRef = db.collection("schools");
    const querySnapshot = await schoolsRef.get();

    let userDocRef = null;

    for (const doc of querySnapshot.docs) {
      const schoolOfficialsRef = doc.ref.collection("school_officials");
      const userSnapshot = await schoolOfficialsRef
        .where("email", "==", email)
        .get();

      if (!userSnapshot.empty) {
        // Found the user document
        userDocRef = userSnapshot.docs[0].ref;
        break;
      }
    }

    if (!userDocRef) {
      return res.status(404).json({ error: "User not found." });
    }

    // Step 2: Update the user document
    await userDocRef.update(updateData);
    res.status(200).send({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Endpoint for fetching students for the logged-in user's school
app.get("/students/:email", async (req, res) => {
  const { email } = req.params;

  try {
    // Step 1: Search across all schools to find the schoolCode for the user by email
    const schoolsRef = db.collection("schools");
    const querySnapshot = await schoolsRef.get();

    let schoolCode = null;

    for (const doc of querySnapshot.docs) {
      const schoolOfficialsRef = doc.ref.collection("school_officials");
      const userSnapshot = await schoolOfficialsRef
        .where("email", "==", email)
        .get();

      if (!userSnapshot.empty) {
        schoolCode = doc.id; // Found the schoolCode
        break;
      }
    }

    if (!schoolCode) {
      return res.status(404).json({ error: "School not found for the user." });
    }

    // Step 2: Use the retrieved schoolCode to fetch students
    const schoolRef = db.collection("schools").doc(schoolCode);
    const studentsRef = schoolRef.collection("students");
    const studentsSnapshot = await studentsRef.get();

    if (studentsSnapshot.empty) {
      return res.status(404).json({ error: "No students found." });
    }

    const students = studentsSnapshot.docs.map((doc) => doc.data());
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Endpoint for changing the school key
app.post("/changeSchoolKey", async (req, res) => {
  const { email, newSchoolCode } = req.body;

  try {
    const schoolsRef = db.collection("schools");

    // Check if the new school code exists
    const newSchoolDoc = await schoolsRef.doc(newSchoolCode).get();
    if (!newSchoolDoc.exists) {
      return res.status(404).json({ error: "رمز المدرسة غير موجود" });
    }

    // Find the current school of the user
    const querySnapshot = await schoolsRef.get();
    let userDocRef = null;

    for (const doc of querySnapshot.docs) {
      const schoolOfficialsRef = doc.ref.collection("school_officials");
      const userSnapshot = await schoolOfficialsRef
        .where("email", "==", email)
        .get();

      if (!userSnapshot.empty) {
        userDocRef = userSnapshot.docs[0].ref;
        break;
      }
    }

    if (!userDocRef) {
      return res.status(404).json({ error: "User not found." });
    }

    // Get user data and add to new school's school_officials subcollection
    const userData = (await userDocRef.get()).data();
    userData.schoolCode = newSchoolCode; // Ensure the schoolCode is updated

    // Move the user data to the new school's school_officials collection
    await schoolsRef
      .doc(newSchoolCode)
      .collection("school_officials")
      .doc(userDocRef.id) // Use the same user ID to update the document
      .set(userData); // Use set to update the document, not add a new one

    // Delete user from old school_officials collection
    await userDocRef.delete();

    res.status(200).json({ message: "School key updated successfully." });
  } catch (error) {
    console.error("Error changing school key:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Endpoint for fetching last opportunities to use it in ReportsTable
app.get("/opportunities", async (req, res) => {
  const { email } = req.query; // Get email from query parameters

  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    // Step 1: Search across all schools to find the schoolCode for the user by email
    const schoolsRef = db.collection("schools");
    const querySnapshot = await schoolsRef.get();

    let schoolCode = null;

    for (const doc of querySnapshot.docs) {
      const schoolOfficialsRef = doc.ref.collection("school_officials");
      const userSnapshot = await schoolOfficialsRef
        .where("email", "==", email)
        .get();

      if (!userSnapshot.empty) {
        schoolCode = doc.id; // Found the schoolCode
        break;
      }
    }

    if (!schoolCode) {
      return res.status(404).json({ error: "School not found for the user." });
    }

    // Continue with the rest of the code to fetch opportunities
    const studentsRef = db
      .collection("schools")
      .doc(schoolCode)
      .collection("students");
    const studentsSnapshot = await studentsRef
      .where("lastOpportunity", "!=", "")
      .get();

    if (studentsSnapshot.empty) {
      return res
        .status(404)
        .json({ message: "No students found with opportunities." });
    }

    const opportunitiesData = [];
    for (const studentDoc of studentsSnapshot.docs) {
      const student = studentDoc.data();
      const lastOpportunityId = student.lastOpportunity;

      // Query the opportunity details using collectionGroup to fetch any document in "opportunities"
      const opportunitySnapshot = await db
        .collectionGroup("opportunities")
        .where("id", "==", lastOpportunityId)
        .get();

      if (!opportunitySnapshot.empty) {
        const opportunity = opportunitySnapshot.docs[0].data();
        opportunitiesData.push({
          studentName: student.name, // Ensure studentName is passed here
          opportunityName: opportunity.name,
          hour: opportunity.hour,
          date: opportunity.date,
          level: student.level,
          city: student.city,
          description: opportunity.description,
          organizationName: opportunity.organizationName,
        });
      }
    }

    return res.json(opportunitiesData); // Send response with all necessary fields
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    res.status(500).json({ error: "Failed to fetch opportunities." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
