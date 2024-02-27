const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const CouresController = require("../controllers/coures");

router.get("/", CouresController.getAllCourses);
router.get("/:courseId/:lessonId/:unitId", CouresController.getCoursesById);
// eslint-disable-next-line max-len
router.put("/editCourse/:courseId/:lessonId/:unitId", CouresController.editCourses);
// eslint-disable-next-line max-len
router.delete("/deleteCourse/:courseId/:lessonId/:unitId", CouresController.deleteCourses);
router.post("/create/:courseId/:lessonId", CouresController.createCourse);
router.get("/lessons/:courseId", CouresController.getLessonsByIdCourses);
router.post("/addLesson/:courseId", CouresController.addLesson);
// eslint-disable-next-line max-len
router.delete("/deleteLesson/:courseId/:lessonId", CouresController.deleteLesson);
// router.get("/:id", UserController.getUserById);
// router.put("/:id", UserController.updateUser);
// router.post("/register", UserController.registerUser);
// router.post("/login", UserController.loginUser);

module.exports = router;
