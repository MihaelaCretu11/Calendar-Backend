const express = require("express");
const {
  createEvent,
  getAllEvents,
  getEvent,
  updateEventNoOfParticipants,
  editEvent,
  getEventsByInterval
} = require("../controllers/eventController");

const router = express.Router();

router.post("/events", createEvent);
router.get("/events", getAllEvents);
router.get("/getEventsByInterval", getEventsByInterval);
router.get("/events/:id", getEvent);
router.put("/events/:id", updateEventNoOfParticipants);
router.put("/events/edit/:id", editEvent);
module.exports = {
  routes: router,
};
