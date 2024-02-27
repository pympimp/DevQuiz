/* eslint-disable max-len */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const admin = require("firebase-admin");
const serviceAccount = require("../service.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// ส่วนของการเรียกข้อมูล user
/**
 * Controller handling user-related operations.
 */
class UserController {
  /**
   * Get all users.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getAllUsers(req, res) {
    try {
      const usersSnapshot = await db.collection("users").get();
      const users = [];

      // วนลูปผู้ใช้ใน collection users
      await Promise.all(usersSnapshot.docs.map(async (userDoc) => {
        const userId = userDoc.id;
        const userData = userDoc.data();

        // ดึงข้อมูล progress ภายใน collection progress ของผู้ใช้นั้น ๆ
        const progressSnapshot = await userDoc.ref.collection("progress").get();

        // เรียงลำดับข้อมูล progress ตาม lesson และ unit
        const sortedProgressData = progressSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
            .sort((a, b) => {
              const getLessonNumber = (lesson) => {
                if (lesson && lesson.nameLesson) {
                  return parseInt(lesson.nameLesson.replace("lesson", ""), 10);
                }
                return 0;
              };

              const getUnitNumber = (unit) => {
                if (unit && unit.nameUnit) {
                  return parseInt(unit.nameUnit.replace("unit", ""), 10);
                }
                return 0;
              };

              if (a.nameLesson !== b.nameLesson) {
                return getLessonNumber(a) - getLessonNumber(b);
              } else {
                return getUnitNumber(a) - getUnitNumber(b);
              }
            });

        // เพิ่มข้อมูล progress เข้าไปในข้อมูลผู้ใช้
        users.push({id: userId, ...userData, progress: sortedProgressData});
      }));

      // เรียงลำดับผู้ใช้ตามต้องการ
      // ตัวอย่าง: เรียงตามชื่อผู้ใช้
      users.sort((a, b) => a.username.localeCompare(b.username));

      res.status(200).send(JSON.stringify(users));
    } catch (error) {
      console.error("Error getting documents: ", error);
      res.status(500).send("Internal Server Error");
    }
  }


  /**
   * Get user by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getUserById(req, res) {
    try {
      const snapshot = await db.collection("users").doc(req.params.id).get();
      if (!snapshot.exists) {
        return res.status(404).json({error: "User not found"});
      }

      const userId = snapshot.id;
      const userData = snapshot.data();

      const progressSnapshot = await snapshot.ref.collection("progress").get();

      // เรียงลำดับข้อมูล progress ตาม lesson และ unit
      const sortedProgressData = progressSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
          .sort((a, b) => {
            const getLessonNumber = (lesson) => {
              if (lesson && lesson.nameLesson) {
                return parseInt(lesson.nameLesson.replace("lesson", ""), 10);
              }
              return 0;
            };

            const getUnitNumber = (unit) => {
              if (unit && unit.nameUnit) {
                return parseInt(unit.nameUnit.replace("unit", ""), 10);
              }
              return 0;
            };

            if (a.nameLesson !== b.nameLesson) {
              return getLessonNumber(a) - getLessonNumber(b);
            } else {
              return getUnitNumber(a) - getUnitNumber(b);
            }
          });

      res.status(200).send(JSON.stringify({id: userId, ...userData, progress: sortedProgressData}));
    } catch (error) {
      res.status(401).send("Error");
    }
  }

  /**
   * Get user by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getUserProgress(req, res) {
    try {
      const snapshot = await db.collection("users").doc(req.params.id).get();
      if (!snapshot.exists) {
        return res.status(404).json({error: "User not found"});
      }
      const progressSnapshot = await snapshot.ref.collection("progress").doc(req.params.progressId).get();
      const dataProgress = progressSnapshot.data();

      res.status(200).send(JSON.stringify({...dataProgress}));
    } catch (error) {
      res.status(401).send("Error");
    }
  }

  /**
   * Update user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async updateUser(req, res) {
    const body = req.body;

    await db.collection("users").doc(req.params.id).update(body);

    res.status(200).send(JSON.stringify({message: "Success"}));
  }

  /**
   * Update user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async updateTestUser(req, res) {
    try {
      const userId = req.params.id;
      const name = req.params.name;
      const body = req.body;

      // สร้าง path สำหรับ document ใน collection progress
      const progressDocPath = db.collection("users").doc(userId).collection("progress");
      const snapshot = await progressDocPath.where("name", "==", name).get();

      // ใช้ Promise.all() เพื่อรอให้ทุกคำสั่ง .set() เสร็จสิ้น
      await Promise.all(snapshot.docs.map(async (doc) => {
        // ใช้ .set() บนแต่ละเอกสาร
        await progressDocPath.doc(doc.id).set(body, {merge: true});
      }));

      res.status(200).send({message: "Update Success"});
    } catch (error) {
      console.error("Error updating documents: ", error);
      res.status(500).send("Internal Server Error");
    }
  }
  /**
   * Delete user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async deleteUser(req, res) {
    await db.collection("users").doc(req.params.id).delete();

    res.status(200).send();
  }

  /**
   * Register a new user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async registerUser(req, res) {
    try {
      const {email, username, password} = req.body;

      // Check if email or username already exists in the database
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
        role: "user",
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

      res.status(201).send({message: "success register"});
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "Error creating user"});
    }
  }
  /**
   * Login user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async loginUser(req, res) {
    try {
      const {username, password} = req.body;
      // eslint-disable-next-line max-len
      const userQuerySnapshot = await db.collection("users").where("username", "==", username).limit(1).get();
      if (userQuerySnapshot.empty) {
        return res.status(401).json({error: "Invalid username"});
      }

      const userData = userQuerySnapshot.docs[0].data();

      if (userData.password !== password) {
        return res.status(401).json({error: "wrong password"});
      }

      const uid = userQuerySnapshot.docs[0].id;
      if (uid) {
        await updateUserStats(userQuerySnapshot);
      }

      // eslint-disable-next-line max-len, no-undef
      const token = await admin.auth().createCustomToken(uid);

      res.status(200).json({token, ...userData, uid});
    } catch (error) {
      console.error(error);
      res.status(401).send("Invalid credentials");
    }
  }

  /**
   * Login user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  loginStat(req, res) {
    const userId = req.params.id;
    const userStatsRef = db.collection("loginStats");

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const sendEvent = (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    // นับรวมค่า count ของทุกเอกสาร
    const getTotalCount = (userStatsDocs) => {
      let totalCount = 0;

      userStatsDocs.forEach((doc) => {
        const dailyCount = doc.data().dailyCount || 0;
        totalCount += dailyCount;
      });

      return totalCount;
    };

    // นับรวมค่า count ในแต่ละสัปดาห์
    const getWeeklyCountsTotal = (userStatsDocs) => {
      const weeklyTotal = {};

      userStatsDocs.forEach((doc) => {
        const weeklyCounts = doc.data().weeklyCounts || [];

        weeklyCounts.forEach((entry) => {
          const {count, weekNumber} = entry;

          if (!weeklyTotal[weekNumber]) {
            weeklyTotal[weekNumber] = 0;
          }

          weeklyTotal[weekNumber] += count;
        });
      });

      return weeklyTotal;
    };

    // ติดตามการเปลี่ยนแปลงของ "loginStats" collection
    const unsubscribe = userStatsRef.onSnapshot((snapshot) => {
      const userStatsDocs = snapshot.docs;

      // นับรวมค่า count และ weeklyCounts
      const totalCount = getTotalCount(userStatsDocs);
      const weeklyTotal = getWeeklyCountsTotal(userStatsDocs);

      // ส่งข้อมูลไปยัง client
      sendEvent({uid: userId, totalCount, weeklyTotal});
    });

    req.on("close", () => {
      console.log("Connection closed");
      // เมื่อเชื่อมต่อปิดลง, หยุดติดตามการเปลี่ยนแปลง
      unsubscribe();
    });
  }
}

/**
   * Get all users.
   * @param {Object} user - Express request object.
   */
async function updateUserStats(user) {
  const userStatsRef = db.collection("loginStats").doc(user.docs[0].id);
  const userStatsDoc = await userStatsRef.get();
  const userData = user.docs[0].data();

  try {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentWeek = getWeekNumber(currentDate);
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based

    if (userStatsDoc.exists) {
      const currentStats = userStatsDoc.data();

      // Check today
      if (currentStats.lastLoginDate === currentDay) {
        currentStats.dailyCount += 1;
      } else {
        currentStats.dailyCount = 1;
        currentStats.lastLoginDate = currentDay;
      }

      // Check this week
      if (!currentStats.weeklyCounts) {
        currentStats.weeklyCounts = [];
      }

      const currentWeekIndex = currentStats.weeklyCounts.findIndex((week) => week.weekNumber === currentWeek);

      if (currentWeekIndex !== -1) {
        // Week found, increment count
        currentStats.weeklyCounts[currentWeekIndex].count += 1;
      } else {
        // Week not found, create a new entry
        currentStats.weeklyCounts.push({weekNumber: currentWeek, count: 1});
      }

      // Check this month
      if (currentStats.lastLoginMonth === currentMonth) {
        currentStats.monthlyCount += 1;
      } else {
        currentStats.monthlyCount = 1;
        currentStats.lastLoginMonth = currentMonth;

        // Reset weekly counts at the beginning of a new month
        currentStats.weeklyCounts = [];
      }

      await userStatsRef.update(currentStats);
    } else {
      await userStatsRef.set({
        dailyCount: 1,
        weeklyCounts: [{weekNumber: currentWeek, count: 1}],
        monthlyCount: 1,
        lastLoginDate: currentDay,
        lastLoginWeek: currentWeek,
        lastLoginMonth: currentMonth,
        username: userData.username,
      });
    }

    console.log({"User logged in": userData.username});
  } catch (error) {
    console.error("Error updating user stats:", error);
  }
}


// eslint-disable-next-line valid-jsdoc
/**
   * Get all users.
   * @param {Object} date - Express request object.
   */
function getWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}


module.exports = new UserController();

// ส่วนของการเรียกข้อมูล user


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
