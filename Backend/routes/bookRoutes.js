const express = require("express");
const router = express.Router();
const { addBook, getBooks } = require("../controllers/bookController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addBook); 
router.get("/", getBooks);          

module.exports = router;
