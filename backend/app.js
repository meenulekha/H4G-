const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const meetings = require("./routes/meetings");
const tasks = require("./routes/tasks");
const notifications = require("./routes/notifications");
const summarization = require("./routes/summarization");

require("dotenv").config();

admin.initializeApp({ credential: admin.credential.applicationDefault() });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/meetings", meetings);
app.use("/tasks", tasks);
app.use("/notifications", notifications);
app.use("/summarization", summarization);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
