const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const ClassController = require("../controllers/class");

router.get("/", ClassController.getAllClass);
router.get("/:id", ClassController.getOneClassById);
// router.get("/:id", UserController.getUserById);
// router.put("/:id", UserController.updateUser);
// router.delete("/:id", UserController.deleteUser);
// router.post("/register", UserController.registerUser);
// router.post("/login", UserController.loginUser);

module.exports = router;
