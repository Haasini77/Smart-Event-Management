import express from "express";

import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  cancelRegistration,
} from "../controllers/eventController";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// =====================================
// EVENT ROUTES
// =====================================

// Get all events
router.get("/", getEvents);

// Get single event
router.get("/:id", getEventById);

// Create event
router.post(
  "/",
  protect,
  createEvent
);

// Update event
router.put(
  "/:id",
  protect,
  updateEvent
);

// Delete event
router.delete(
  "/:id",
  protect,
  deleteEvent
);

// =====================================
// REGISTRATION ROUTES
// =====================================

// Register for event
router.post(
  "/:id/register",
  protect,
  registerForEvent
);

// Cancel registration
router.delete(
  "/:id/register",
  protect,
  cancelRegistration
);

export default router;