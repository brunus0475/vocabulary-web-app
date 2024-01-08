const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/VocabularyWebApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    const Term = mongoose.model(
      "Term",
      new mongoose.Schema({
        term: String,
        definition: String,
        category: String
      })
    );
    Term.insertMany([
      {
        term: "Example Term 1",
        definition: "Example Definition 1",
        category: "Example Category 1"
      },
      {
        term: "Example Term 2",
        definition: "Example Definition 2",
        category: "Example Category 2"
      },
      {
        term: "Example Term 3",
        definition: "Example Definition 3",
        category: "Example Category 3"
      }
    ])
      .then(docs => {
        console.log("Initial data loaded successfully");
        process.exit(0);
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      });
  })
  .catch(err => console.error("Failed to connect to MongoDB", err));
