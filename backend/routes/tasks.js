const express = require("express");
const admin = require("firebase-admin");

const router = express.Router();

// Create a new task
router.post("/create", async (req, res) => {
  try {
    const { task, assigneeId } = req.body;

    await admin.firestore().collection("tasks").add({
      task,
      assigneeId,
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ success: true, message: "Task created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark task as complete
router.post("/complete", async (req, res) => {
  try {
    const { taskId } = req.body;

    await admin.firestore().collection("tasks").doc(taskId).update({
      status: "completed",
    });

    res.status(200).json({ success: true, message: "Task marked as complete" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
