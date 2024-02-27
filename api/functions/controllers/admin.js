/* eslint-disable max-len */
const admin = require("firebase-admin");
const serviceAccount = require("../service.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

/**
 * Controller handling user-related operations.
 */
class AdminController {
  /**
   * Get all users with admin.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async adminGetUser(req, res) {
    try {
      const usersSnapshot = await db.collection("users").get();
      const users = [];

      usersSnapshot.forEach((doc) => {
        const userId = doc.id;
        const userData = doc.data();
        users.push({id: userId, ...userData});
      });

      res.status(200).send(JSON.stringify(users));
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({error: "Internal server error"});
    }
  }

  /**
   * Get create users with admin.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async adminCreateUser(req, res) {
    try {
      const {email, username, password, role} = req.body;
      // eslint-disable-next-line max-len
      const existingEmail = await db.collection("users").where("email", "==", email).get();
      // eslint-disable-next-line max-len
      const existingUsername = await db.collection("users").where("username", "==", username).get();

      if (!existingEmail.empty) {
      // If user with the same email or username exists, return a message
        res.status(400).json({error: "Email  already exists"});
        return;
      } if (!existingUsername.empty) {
        res.status(400).json({error: "Username  already exists"});
        return;
      }

      // If no duplicate, add the new user to the database
      const userRef = await db.collection("users").add({
        email: email,
        username: username,
        password: password,
        role: role,
      });

      const progressRef = userRef.collection("progress");

      await progressRef.add({
        name: "HTML",
        lesson1: {unit1: true, unit2: false, unit3: false, unit4: false, unit5: false},
        lesson2: {unit1: false, unit2: false, unit3: false, unit4: false, unit5: false},
        lesson3: {unit1: false, unit2: false, unit3: false, unit4: false, unit5: false},
        lesson4: {unit1: false, unit2: false, unit3: false, unit4: false, unit5: false},
        lesson5: {unit1: false, unit2: false, unit3: false, unit4: false, unit5: false},
      });

      await progressRef.add({
        name: "CSS",
        lesson1: {unit1: true, unit2: false, unit3: false, unit4: false, unit5: false},
        lesson2: {unit1: false, unit2: false, unit3: false, unit4: false, unit5: false},
        lesson3: {unit1: false, unit2: false, unit3: false, unit4: false, unit5: false},
        lesson4: {unit1: false, unit2: false, unit3: false, unit4: false, unit5: false},
        lesson5: {unit1: false, unit2: false, unit3: false, unit4: false, unit5: false},
      });

      await progressRef.add({
        name: "JavaScript",
        lesson1: {unit1: true, unit2: false, unit3: false, unit4: false, unit5: false},
        lesson2: {unit1: false, unit2: false, unit3: false, unit4: false, unit5: false},
        lesson3: {unit1: false, unit2: false, unit3: false, unit4: false, unit5: false},
        lesson4: {unit1: false, unit2: false, unit3: false, unit4: false, unit5: false},
        lesson5: {unit1: false, unit2: false, unit3: false, unit4: false, unit5: false},
      });

      res.status(201).send({message: "success create"});
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "Error creating user"});
    }
  }
  /**
   * Get create users with admin.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async editUser(req, res) {
    const body = req.body;

    await db.collection("users").doc(req.params.id).update(body);

    res.status(200).send({message: "Update Success"});
  }

  // eslint-disable-next-line require-jsdoc
  async deleteUser(req, res) {
    const userDocRef = db.collection("users").doc(req.params.id);
    try {
      const progressCollectionRef = userDocRef.collection("progress");
      const progressSnapshot = await progressCollectionRef.get();
      const batch = db.batch();
      progressSnapshot.forEach((progressDoc) => {
        batch.delete(progressDoc.ref);
      });
      await batch.commit();
      await userDocRef.delete();
      res.status(200).send({message: "User have been delete"});
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send({error: "Internal server error"});
    }
  }
}

module.exports = new AdminController();
