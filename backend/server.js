const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4000;

// Establish the connection before starting the server
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

    // Move the require statement here
    const termRoutes = require("./routes/termRoutes");
    app.use("/api/terms", termRoutes);
  })
  .catch(err => console.error("Failed to connect to MongoDB", err));
