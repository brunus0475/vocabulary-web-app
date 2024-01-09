const express = require("express");
const router = express.Router();
const Term = require("../models/Term");

class TermExistsError extends Error {
  constructor(term) {
    super(`The term "${term}" is already present in the vocabulary.`);
    this.name = "TermExistsError";
  }
}

// /server/routes/termRoutes.js
router.post("/add", async (req, res) => {
  if (!req.body.term.trim()) {
    return res.status(400).send("Term cannot be empty.");
  }

  if (!req.body.definition.trim()) {
    return res.status(400).send("Definition cannot be empty.");
  }

  if (!req.body.category.trim()) {
    return res.status(400).send("Category cannot be empty.");
  }

  const termExists = await Term.findOne({ term: req.body.term });

  if (!termExists) {
    // The term does not exist, proceed to create a new term
    const term = new Term({
      term: req.body.term,
      definition: req.body.definition,
      category: req.body.category
    });

    try {
      const savedTerm = await term.save();
      res.send(savedTerm);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    // The term already exists, send a response
    console.warn(`Attempted to add duplicate term: ${req.body.term}`);
    return res.send("The term is already present.");
  }
});

router.get("/", async (req, res) => {
  try {
    const terms = await Term.find();
    res.send(terms);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
