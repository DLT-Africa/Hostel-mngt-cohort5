const asyncHandler = require("express-async-handler");
const Room = require("../models/RoomModel");

const createNewRoom = asyncHandler(async (req, res) => {
  const { roomNum, roomCapacity, roomLocation } = req.body;

  try {
    if (!roomNum || !roomCapacity || !roomLocation) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const roomExist = await Room.findOne({ roomNumber: roomNum });

    if (roomExist) {
      return res.status(400).json({ message: "Room already exist" });
    }

    const room = await Room.create({
      roomNumber: roomNum,
      roomCapacity,
      roomLocation,
    });
    res.status(201).json(room);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


const getAllRoom = asyncHandler(async (req, res) => {
    const rooms = await Room.find().sort("-createdAt")
    if (!rooms) {
        res.status(500);
        throw new Error("something went wrong")
    }

    return res.status(200).json(rooms)
})


const getRoom = asyncHandler(async (req, res) => {

    const { roomId } = req.params;

    const room = await Room.findById(roomId);

    if (room) {
        const { _id, roomNumber, roomCapacity, roomLocation, roomOccupancy, roomStatus } = room;

       return res.status(200).json({ _id, roomNumber, roomCapacity, roomLocation, roomOccupancy,  roomStatus })
    } else {
       return res.status(404).json({ message: "Room not found" })
    }
}
)

const deleteRoom = asyncHandler(async (req, res) => {

    const { roomId } = req.params

    const room = Room.findById(roomId);
    if (!room) {
        res.status(404);
        throw new Error("room not found in database");

    }

    await room.deleteOne();
   return res.status(200).json({
        message: "room deleted successfully!"
    })
}
)



module.exports = {
    
    createNewRoom,
     getAllRoom,
     getRoom,
     deleteRoom

};
