// controllers/assignmentController.js
import Assignment from "../models/Assignment.js";
import Course from '../models/Course.js';

// export const createAssignment = async (req, res) => {
//   try {
//     const assignment = await Assignment.create(req.body);
//     res.status(201).json(assignment);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };


// CREATE Assignment
export const createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);

    if (req.body.courseId) {
      await Course.findByIdAndUpdate(req.body.courseId, {
        $addToSet: { assignments: assignment._id },
      });
    }

    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// GET Assignments
export const getAssignments = async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
};

// UPDATE Assignment
export const updateAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const existingAssignment = await Assignment.findById(assignmentId);

    if (!existingAssignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const updatedAssignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      req.body,
      {
        new: true,
      }
    );

    // If course changed, update course reference
    if (
      req.body.courseId &&
      req.body.courseId !== existingAssignment.courseId.toString()
    ) {
      await Course.findByIdAndUpdate(existingAssignment.courseId, {
        $pull: { assignments: assignmentId },
      });

      await Course.findByIdAndUpdate(req.body.courseId, {
        $addToSet: { assignments: assignmentId },
      });
    }

    res.json(updatedAssignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE Assignment
export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);

    if (assignment && assignment.courseId) {
      await Course.findByIdAndUpdate(assignment.courseId, {
        $pull: { assignments: assignment._id },
      });
    }

    res.json({ message: "Assignment deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// export const updateAssignment = async (req, res) => {
//   try {
//     const assignment = await Assignment.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(assignment);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// export const deleteAssignment = async (req, res) => {
//   try {
//     await Assignment.findByIdAndDelete(req.params.id);
//     res.json({ message: "Assignment deleted" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
