const db = require("../config/mysql");


exports.addBook = async (req, res) => {
  try {
    const { title, author, isbn, price, quantity, description } = req.body;

    const [result] = await db.execute(
      `INSERT INTO books 
      (title, author, isbn, price, quantity, description)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [title, author, isbn, price, quantity, description]
    );

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      bookId: result.insertId,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getBooks = async (req, res) => {
  try {
    const [books] = await db.execute("SELECT * FROM books");

    res.json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
