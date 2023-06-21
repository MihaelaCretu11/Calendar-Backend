"use strict";
const jwt = require("jsonwebtoken");
const firebase = require("../db");
const Event = require("../models/event");
const firestore = firebase.firestore();
var moment = require("moment");
const { FieldValue } = require("firebase-admin/firestore");

const createEvent = async (req, res, next) => {
  try {
    const data = req.body;
    const eventRef = await firestore.collection("events").doc();
    const eventRefId = eventRef.id;
    eventRef.set(data);
    const id = req.params.id;
    res.status(201).json({
      id: eventRefId,
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
      startHour: data.startHour,
      endHour: data.endHour,
      primaryColour: data.primaryColour,
      secondaryColour: data.secondaryColour,
      recursive: data.recursive,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllEvents = async (req, res, next) => {
  try {
    const events = await firestore.collection("events");
    const data = await events.get();
    const eventsArray = [];
    const usersAndEventsCollection = await firestore
      .collection("usersAndEvents")
      .get();
    if (data.empty) {
      res.status(404).send("No event record found");
    } else {
      data.forEach((doc) => {
        const eventId = doc.id;
        const event = new Event(
          doc.id,
          doc.data().title,
          doc.data().startDate,
          doc.data().endDate,
          doc.data().startHour,
          doc.data().endHour,
          doc.data().primaryColour,
          doc.data().secondaryColour,
          doc.data().recursive,
        );
        const test = [];
        usersAndEventsCollection.forEach((event) => {
          if (event.data().eventId === eventId) {
            test.push(event.data());
          }
        });
        eventsArray.push({
          ...event,
        });
      });
      res.send(eventsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getEvent = async (req, res, next) => {
  try {
    // Get user name from GET Params
    const id = req.params.id;
    const usersAndEventsCollection = await firestore
      .collection("usersAndEvents")
      .get();

    // Reference to Firestore 'schools' collection
    const eventsCollection = firestore.collection("events").doc(id);
    const doc = await eventsCollection.get();
    if (!doc.exists) {
      res.status(404).send("Event with the given id not found !");
    } else {
      const test = [];
      usersAndEventsCollection.forEach((event) => {
        if (event.data().eventId === id) {
          test.push({ ...event.data() });
        }
      });
      const eventArray = {
        ...doc.data(),
        id: id,
      };
      res.send(eventArray);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getEventsByInterval = async (req, res, next) => {
  try {
    // Get user name from GET Params
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const eventsCollection = await firestore.collection("events").get();
    if (eventsCollection.empty) {
      res.status(404).send("Event with the startDate not found !");
    } else {
      const eventsInInterval = [];
      eventsCollection.forEach((event) => {
        console.log(event.id);
        if (
          moment(event.data().startDate).isSame(startDate) ||
          moment(event.data().endDate).isSame(startDate) ||
          moment(event.data().startDate).isSame(endDate) ||
          moment(event.data().endDate).isSame(endDate) ||
          moment(event.data().startDate).isBetween(startDate, endDate) ||
          moment(event.data().endDate).isBetween(startDate, endDate)
          // moment(event.data().startDate).format("YYYY-MM-DD") === startDate ||
          // moment(event.data().endDate).format("YYYY-MM-DD") === startDate ||
          // moment(event.data().startDate).format("YYYY-MM-DD") === endDate ||
          // moment(event.data().endDate).format("YYYY-MM-DD") === endDate ||
          // (moment(event.data().startDate).format("YYYY-MM-DD") >= startDate &&
          //   moment(event.data().startDate).format("YYYY-MM-DD") <= endDate) ||
          // (moment(event.data().endDate).format("YYYY-MM-DD") >= startDate &&
          //   moment(event.data().endDate).format("YYYY-MM-DD") <= endDate)
        ) {
          eventsInInterval.push({ ...event.data(), id: event.id });
        }
      });
      res.send(eventsInInterval);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const updateEventNoOfParticipants = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const event = await firestore.collection("events").doc(id);
    await event.update({
      currentNumberOfParticipants: FieldValue.increment(-1),
    });
    const newEvent = await event.get();
    res.send({ ...newEvent.data(), id });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const editEvent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const event = await firestore.collection("events").doc(id);
    await event.update(data);
    const updatedEvent = await event.get();
    res.send({ ...updatedEvent.data(), id });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEvent,
  getEventsByInterval,
  updateEventNoOfParticipants,
  editEvent,
};
