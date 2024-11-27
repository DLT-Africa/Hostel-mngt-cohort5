const express = require("express");
const { protectAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

const {
  createNewRoom,
  getAllRoom,
  getRoom,
  deleteRoom,
} = require("../controller/RoomController");

router.post("/create-room", protectAdmin, createNewRoom);
router.get("/", protectAdmin, getAllRoom);
router.get("/:roomId", protectAdmin, getRoom);
router.delete("/:roomId", protectAdmin, deleteRoom);

module.exports = router;
