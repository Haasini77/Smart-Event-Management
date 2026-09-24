import express from "express";

import {
  registerForEvent,
  cancelRegistration,
  getMyRegisteredEvents,
} from "../controllers/registrationController";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Register for an event
router.post("/:eventId", protect, registerForEvent);

// Cancel registration
router.delete("/:eventId", protect, cancelRegistration);

// Get my registered events
router.get("/my", protect, getMyRegisteredEvents);

export default router;