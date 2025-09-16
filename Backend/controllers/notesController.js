import Notes from "../models/Notes.js";
import User from "../models/userModel.js";

// @desc Get the user's note
// @route GET /api/notes
// @access Private (only for hasPaid: true users)
export const getNote = async (req, res) => {
  try {
    // Get full user data
    const user = await User.findById(req.user.id);
    if (!user || !user.hasPaid) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Please purchase a course." });
    }
    
    // Find note for this user, or create if missing
    let note = await Notes.findOne({ user: user._id });
    if (!note) {
      note = await Notes.create({
        user: user._id,
        title: "Sticky Note",
        content: "",
        color: "#fff8b5",
      });
    }

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update the user's note
// @route PUT /api/notes
// @access Private (only for hasPaid: true users)
export const updateNote = async (req, res) => {
  try {
    // Get full user data
    const user = await User.findById(req.user.id);
    if (!user || !user.hasPaid) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Please purchase a course." });
    }

    let note = await Notes.findOne({ user: user._id });

    if (!note) {
      // If note doesn’t exist, create one
      note = await Notes.create({
        user: user._id,
        title: req.body.title || "Sticky Note",
        content: req.body.content || "",
        color: req.body.color || "#fff8b5",
      });
    } else {
      // Update existing
      note.title = req.body.title ?? note.title;
      note.content = req.body.content ?? note.content;
      note.color = req.body.color ?? note.color;
      await note.save();
    }

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};