const express = require("express");
const router = express.Router();
const { createUser, getUsers, hardDeleteUser, softDeleteUser, updateUser, restoreUser, getAllUsers } = require("../controllers/userController");
const { validateRegisterUser, validateUpdateUser } = require("../validators/userValidators");
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/create", authMiddleware, validateRegisterUser, createUser);
router.get("/list", authMiddleware, getUsers);
router.put("/update/:id", authMiddleware, validateUpdateUser, updateUser);
router.delete("/delete/:id", authMiddleware, softDeleteUser);
router.delete("/delete-hard/:id", authMiddleware, hardDeleteUser);
router.put("/restore/:id", authMiddleware, restoreUser);
router.get("/list-all", authMiddleware, getAllUsers);


module.exports = router;
