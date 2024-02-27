const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const adminController = require("../controllers/admin");

router.get("/", adminController.adminGetUser);
router.post("/createUser", adminController.adminCreateUser);
router.put("/edit/:id", adminController.editUser);
router.delete("/delete/:id", adminController.deleteUser);

module.exports = router;
