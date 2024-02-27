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
class CouresController {
  /**
   * Get all users.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getAllCourses(req, res) {
    const coursesSnapshot = db.collection("coures");
    const courses = [];

    try {
      const mainSnapshot = await coursesSnapshot.get();

      await Promise.all(mainSnapshot.docs.map(async (mainDoc) => {
        const courseId = mainDoc.id;
        const mainCourseData = mainDoc.data();

        // eslint-disable-next-line max-len
        const lessonsSnapshot = await coursesSnapshot.doc(courseId).collection("lesson").get();
        const lessons = [];

        await Promise.all(lessonsSnapshot.docs.map(async (lessonDoc) => {
          const lessonId = lessonDoc.id;
          const lessonData = lessonDoc.data();

          // eslint-disable-next-line max-len
          const unitsSnapshot = await coursesSnapshot.doc(courseId).collection("lesson").doc(lessonId).collection("unit").get();
          const units = unitsSnapshot.docs.map((unitDoc) => {
            const unitId = unitDoc.id;
            const unitData = unitDoc.data();
            return {unitId, ...unitData};
          });

          units.sort((a, b) => {
            const getUnitNumber = (unit) => {
              const nameUnit = unit.nameUnit || "";
              // eslint-disable-next-line max-len
              const unitNumberMatch = nameUnit.match(/(\d+)$/); // ดึงตัวเลขท้ายสุดในชื่อ unit
              return unitNumberMatch ? parseInt(unitNumberMatch[0], 10) : 0;
            };
            // eslint-disable-next-line max-len
            return getUnitNumber(a) - getUnitNumber(b) || a.nameUnit.localeCompare(b.nameUnit);
          });

          lessons.push({lessonId, ...lessonData, units});
        }));

        lessons.sort((a, b) => a.nameLesson.localeCompare(b.nameLesson));

        courses.push({courseId, ...mainCourseData, lessons});
      }));

      courses.sort((a, b) => {
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

      res.status(200).send(JSON.stringify(courses));
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
  async getCoursesById(req, res) {
    // eslint-disable-next-line max-len
    const snapShot = await db.collection("coures").doc(req.params.courseId).collection("lesson").doc(req.params.lessonId).collection("unit").doc(req.params.unitId).get();
    const unitId = snapShot.id;
    const unitData = snapShot.data();
    // eslint-disable-next-line max-len
    res.status(200).send(JSON.stringify({id: unitId, ...unitData}));
  }

  /**
   * Get all users.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getLessonsByIdCourses(req, res) {
    // eslint-disable-next-line max-len
    const snapShot = db.collection("coures").doc(req.params.courseId);
    const courses = await snapShot.get();
    const CoursesId = courses.id;
    const CoursesData = courses.data();
    const lessonSnapshot = await snapShot.collection("lesson").get();
    const lessons = [];
    await Promise.all(lessonSnapshot.docs.map(async (lessonDoc) => {
      const lessonId = lessonDoc.id;
      const lessonData = lessonDoc.data();
      // eslint-disable-next-line max-len
      const unitsSnapshot = await snapShot.collection("lesson").doc(lessonId).collection("unit").get();
      const units = unitsSnapshot.docs.map((unitDoc) => {
        const unitId = unitDoc.id;
        const unitData = unitDoc.data();
        return {unitId, ...unitData};
      });

      units.sort((a, b) => {
        const getUnitNumber = (unit) => {
          const nameUnit = unit.nameUnit || "";
          // eslint-disable-next-line max-len
          const unitNumberMatch = nameUnit.match(/(\d+)$/); // ดึงตัวเลขท้ายสุดในชื่อ unit
          return unitNumberMatch ? parseInt(unitNumberMatch[0], 10) : 0;
        };
        // eslint-disable-next-line max-len
        return getUnitNumber(a) - getUnitNumber(b) || a.nameUnit.localeCompare(b.nameUnit);
      });
      lessons.push({lessonId, ...lessonData, units});
      lessons.sort((a, b) => a.nameLesson.localeCompare(b.nameLesson));
    }));
    // eslint-disable-next-line max-len
    res.status(200).send(JSON.stringify({CoursesId, ...CoursesData, lessons}));
  }

  /**
   * Get all users.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async editCourses(req, res) {
    try {
      const body = req.body;
      // eslint-disable-next-line max-len
      await db.collection("coures").doc(req.params.courseId).collection("lesson").doc(req.params.lessonId).collection("unit").doc(req.params.unitId).update(body);

      res.status(201).send({message: "Edit Success"});
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "Error edit course"});
    }
  }

  /**
   * Get all users.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async deleteCourses(req, res) {
    // eslint-disable-next-line max-len
    await db.collection("coures").doc(req.params.courseId).collection("lesson").doc(req.params.lessonId).collection("unit").doc(req.params.unitId).delete();
    res.status(201).send({message: "Delete Success"});
  }

  /**
   * Get all users.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async createCourse(req, res) {
    try {
      const {body, discription, header, question, answer} = req.body;
      // eslint-disable-next-line max-len
      const unitData = db.collection("coures").doc(req.params.courseId).collection("lesson").doc(req.params.lessonId).collection("unit");
      await unitData.add({
        body: body,
        discriptiond: discription,
        header: header,
        nameUnit: "unit" + (0+1),
        question: question,
        answer: answer,
        isExpanded: false,
      });
      res.status(200).send(JSON.stringify({message: "Create Success"}));
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "Error creating course"});
    }
  }

  /**
   * Get all users.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async addLesson(req, res) {
    const {nameLesson} = req.body;
    // eslint-disable-next-line max-len
    const lessonSnapshot = db.collection("coures").doc(req.params.courseId).collection("lesson");
    await lessonSnapshot.add({
      nameLesson: nameLesson,
      isExpanded: false,
    });
    res.status(200).send(JSON.stringify({message: "Add Lesson", nameLesson}));
  }

  /**
   * Get all users.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async deleteLesson(req, res) {
    // eslint-disable-next-line max-len
    await db.collection("coures").doc(req.params.courseId).collection("lesson").doc(req.params.lessonId).delete();
    res.status(201).send({message: "Delete Success"});
  }
}
module.exports = new CouresController();
