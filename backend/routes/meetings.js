const express = require("express");
const admin = require("firebase-admin");

const router = express.Router();

// Schedule a meeting
router.post("/schedule", async (req, res) => {
  try {
    const { meetingDetails } = req.body;

    await admin
      .firestore()
      .collection("meetings")
      .add({
        ...meetingDetails,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    res.status(200).json({ success: true, message: "Meeting scheduled" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
