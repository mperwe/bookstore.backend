const express = require("express");
const router = express.Router();
const Book = require("../models/Book"); // Your Book model

// Search books by title
router.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const books = await Book.find({ title: { $regex: query, $options: "i" } });
    res.json(books);
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
