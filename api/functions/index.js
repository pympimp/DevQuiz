const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const serviceAccount = require("./service.json");
const userRoutes = require("./router/userRouter");
const classRoutes = require("./router/classRouter");
const couresRoutes = require("./router/couresRouter");
const adminRoutes = require("./router/adminRouter");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ทำให้ admin.firestore() เป็น global สามารถใช้ในไฟล์ user.js ได้
global.db = admin.firestore();

app.get("/", (req, res)=>{
  res.send("Hello World");
});
app.use("/user", userRoutes);
app.use("/class", classRoutes);
app.use("/coures", couresRoutes);
app.use("/admin", adminRoutes);

// เปลี่ยนจาก app.listen เป็น exports.handler
exports.handler = async (req, res) => {
  // จัดการรับคำขอและส่งคำตอบในนี้
  // เรียกใช้ Middleware และเส้นทางในฟังก์ชัน handler นี้เช่นเดิม
  app(req, res);
};
