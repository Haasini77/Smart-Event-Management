import { Request, Response } from "express";
import mongoose from "mongoose";
import Event from "../models/Event";

// =====================================
// GET ALL EVENTS
// =====================================
export const getEvents = async (
  _req: Request,
  res: Response
) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email")
      .sort({ date: 1 });

    return res.status(200).json({
      events,
    });
  } catch (error) {
    console.error("Get events error:", error);

    return res.status(500).json({
      message: "Server error while fetching events",
    });
  }
};

// =====================================
// GET SINGLE EVENT
// =====================================
export const getEventById = async (
  req: Request,
  res: Response
) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("registeredUsers", "name email");

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    return res.status(200).json({
      event,
    });
  } catch (error) {
    console.error("Get event error:", error);

    return res.status(500).json({
      message: "Server error while fetching event",
    });
  }
};

// =====================================
// CREATE EVENT
// =====================================
export const createEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      category,
      capacity,
    } = req.body;

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !location ||
      !category ||
      !capacity
    ) {
      return res.status(400).json({
        message: "All event fields are required",
      });
    }

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      category,
      capacity,
      registeredUsers: [],
      createdBy: (req as any).user.userId,
    });

    return res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Create event error:", error);

    return res.status(500).json({
      message: "Server error while creating event",
    });
  }
};

// =====================================
// UPDATE EVENT
// =====================================
export const updateEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Update event error:", error);

    return res.status(500).json({
      message: "Server error while updating event",
    });
  }
};

// =====================================
// DELETE EVENT
// =====================================
export const deleteEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    await Event.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete event error:", error);

    return res.status(500).json({
      message: "Server error while deleting event",
    });
  }
};

// =====================================
// REGISTER FOR EVENT
// =====================================
export const registerForEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const userId = (req as any).user.userId;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Check if already registered
    const alreadyRegistered =
      event.registeredUsers.some(
        (user) => user.toString() === userId
      );

    if (alreadyRegistered) {
      return res.status(400).json({
        message:
          "You are already registered for this event",
      });
    }

    // Check capacity
    if (
      event.registeredUsers.length >=
      event.capacity
    ) {
      return res.status(400).json({
        message: "Event is full",
      });
    }

    // Add user
    event.registeredUsers.push(
      new mongoose.Types.ObjectId(userId)
    );

    await event.save();

    return res.status(200).json({
      message: "Registered for event successfully",
      event,
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message:
        "Server error while registering for event",
    });
  }
};

// =====================================
// CANCEL REGISTRATION
// =====================================
export const cancelRegistration = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const userId = (req as any).user.userId;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Check registration
    const isRegistered =
      event.registeredUsers.some(
        (user) => user.toString() === userId
      );

    if (!isRegistered) {
      return res.status(400).json({
        message:
          "You are not registered for this event",
      });
    }

    // Remove user
    event.registeredUsers =
      event.registeredUsers.filter(
        (user) => user.toString() !== userId
      );

    await event.save();

    return res.status(200).json({
      message:
        "Registration cancelled successfully",
      event,
    });
  } catch (error) {
    console.error(
      "Cancel registration error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error while cancelling registration",
    });
  }
};