const express = require("express");
const { protectAdmin } = require("../middleware/authMiddleware");
const {
  registerStudent,
  getAllStudents,
  deleteStudent,
  getStudent,
  updateStudentProfile,
  changeStudentRoom,
  updateCheckInStatus,
} = require("../controller/StudentController");

const router = express.Router();

router.post("/register-student", protectAdmin, registerStudent);
router.put("/change-room", protectAdmin, changeStudentRoom);
router.get("/", protectAdmin, getAllStudents);
router.get("/:studentId", protectAdmin, getStudent);
router.patch("/:studentId", protectAdmin, updateStudentProfile);
router.post("/check-in-status", protectAdmin, updateCheckInStatus);
router.delete("/delete/:studentId", protectAdmin, deleteStudent);

module.exports = router;
