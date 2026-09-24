import { Request, Response } from "express";
import Event from "../models/Event";

// REGISTER FOR EVENT
export const registerForEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const { eventId } = req.params;
    const userId = (req as any).user.userId;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Check if already registered
    const alreadyRegistered = event.registeredUsers.some(
      (id) => id.toString() === userId
    );

    if (alreadyRegistered) {
      return res.status(400).json({
        message: "You are already registered for this event",
      });
    }

    // Check capacity
    if (event.registeredUsers.length >= event.capacity) {
      return res.status(400).json({
        message: "Event is full",
      });
    }

    event.registeredUsers.push(userId);

    await event.save();

    return res.status(200).json({
      message: "Successfully registered for the event",
      event,
    });
  } catch (error) {
    console.error("Register event error:", error);

    return res.status(500).json({
      message: "Server error while registering for event",
    });
  }
};


// CANCEL REGISTRATION
export const cancelRegistration = async (
  req: Request,
  res: Response
) => {
  try {
    const { eventId } = req.params;
    const userId = (req as any).user.userId;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const isRegistered = event.registeredUsers.some(
      (id) => id.toString() === userId
    );

    if (!isRegistered) {
      return res.status(400).json({
        message: "You are not registered for this event",
      });
    }

    event.registeredUsers = event.registeredUsers.filter(
      (id) => id.toString() !== userId
    );

    await event.save();

    return res.status(200).json({
      message: "Registration cancelled successfully",
      event,
    });
  } catch (error) {
    console.error("Cancel registration error:", error);

    return res.status(500).json({
      message: "Server error while cancelling registration",
    });
  }
};


// GET USER'S REGISTERED EVENTS
export const getMyRegisteredEvents = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;

    const events = await Event.find({
      registeredUsers: userId,
    })
      .populate("createdBy", "name email")
      .sort({ date: 1 });

    return res.status(200).json({
      events,
    });
  } catch (error) {
    console.error("Get registered events error:", error);

    return res.status(500).json({
      message: "Server error while fetching registered events",
    });
  }
};