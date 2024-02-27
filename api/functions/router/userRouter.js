const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const UserController = require("../controllers/user");

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.put("/Test/:id/:name", UserController.updateTestUser);
router.get("/CheckProgress/:id/:progressId", UserController.getUserProgress);
router.get("/userStat/:id", UserController.loginStat);

module.exports = router;
