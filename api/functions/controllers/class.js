/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// const admin = require("firebase-admin");
// const db = admin.firestore();

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
class ClassController {
  /**
   * Get all users.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getAllClass(req, res) {
    // eslint-disable-next-line max-len
    const allData = db.collection("class");
    const class1 = [];

    try {
      const mainSnapshot = await allData.get();

      // ใช้ Promise.all เพื่อรอให้ทุก sub-collection ดึงข้อมูลเสร็จก่อน
      await Promise.all(mainSnapshot.docs.map(async (mainDoc) => {
        const classID = mainDoc.id;
        const mainDocData = mainDoc.data();

        // เข้าถึง sub-collection ภายใน main document
        // eslint-disable-next-line max-len
        const subCollectionRef = allData.doc(classID).collection("content");

        const subSnapshot = await subCollectionRef.get();

        const content = subSnapshot.docs.map((subDoc) => {
          const subDocId = subDoc.id;
          const subDocData = subDoc.data();

          return {subDocId, ...subDocData};
        });

        // รวมข้อมูลจาก main document และ sub collection
        class1.push({classID, ...mainDocData, content});
      }));

      class1.sort((a, b) => {
        // ให้แทนคำหลังจาก : ด้วยค่าเป็นตัวเลข
        const getPriority = (str) => {
          const priorityMapping = {HTML: 1, CSS: 2, JavaScript: 3};
          return priorityMapping[str] || 999;
        };
        // เปรียบเทียบลำดับตาม content.name
        const priorityA = getPriority(a.name);
        const priorityB = getPriority(b.name);
        return priorityA - priorityB;
      });

      res.status(200).send(JSON.stringify(class1));
    } catch (error) {
      console.error("Error getting documents: ", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Get all users.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getOneClassById(req, res) {
    try {
      const snapshot = await db.collection("class").doc(req.params.id).get();
      if (!snapshot.exists) {
        return res.status(404).json({error: "User not found"});
      }

      const classId = snapshot.id;
      const classData = snapshot.data();

      res.status(200).send(JSON.stringify({id: classId, ...classData}));
    } catch (error) {
      res.status(401).send("Error");
    }
  }
}

module.exports = new ClassController();
