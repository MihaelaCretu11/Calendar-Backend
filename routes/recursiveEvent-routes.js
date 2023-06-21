const express = require("express");
const {
  createRecursiveEvent,
  getAllRecursiveEvents,
  getRecursiveEvent,
  updateRecursiveEventNoOfParticipants,
  editRecursiveEvent,
  getRecursiveEventsByInterval,
  deleteRecursiveEvent,
} = require("../controllers/RecursiveEventController");

const router = express.Router();

router.post("/recursiveEvents", createRecursiveEvent);
router.get("/recursiveEvents", getAllRecursiveEvents);
router.get("/getRecursiveEventsByInterval", getRecursiveEventsByInterval);
router.get("/recursiveEvents/:id", getRecursiveEvent);
router.put("/recursiveEvents/:id", updateRecursiveEventNoOfParticipants);
router.put("/recursiveEvents/edit/:id", editRecursiveEvent);
router.delete("/recursiveEvents/:id", deleteRecursiveEvent);
module.exports = {
  routes: router,
};
