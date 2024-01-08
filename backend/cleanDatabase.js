const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/VocabularyWebApp", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

connectDb();

const Term = require("./models/Term");

async function cleanDatabase() {
  try {
    await Term.deleteMany({});
    console.log("Database cleaned successfully");
    process.exit();
  } catch (error) {
    console.error("Failed to clean database", error);
    process.exit(1);
  }
}

cleanDatabase();
