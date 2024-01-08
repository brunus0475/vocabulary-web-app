const mongoose = require("mongoose");

const TermSchema = new mongoose.Schema({
  term: { type: String, required: true },
  definition: { type: String, required: true },
  category: { type: String, required: true }
});

const Term = mongoose.model("Term", TermSchema);
module.exports = Term;
