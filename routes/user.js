const express = require("express");
const router = express.Router();
const { createUser, getUsers, hardDeleteUser, softDeleteUser, updateUser } = require("../controllers/userController");
const { validateRegisterUser } = require("../validators/userValidators");
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/create", authMiddleware, validateRegisterUser, createUser);
router.get("/list", authMiddleware, getUsers);
router.put("/update/:id", authMiddleware, validateRegisterUser, updateUser);
router.delete("/delete/:id", authMiddleware, softDeleteUser);
router.delete("/delete-hard/:id", authMiddleware, hardDeleteUser);

module.exports = router;
