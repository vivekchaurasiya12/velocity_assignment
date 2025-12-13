import React, { useEffect, useState } from "react";
import "./Details.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";

const Details = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        const data = await response.json();
        setBooks(data.data);
      } catch (err) {
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

 
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Books:", filteredBooks);

  return (
    <div className="dashboard">
      <NavBar />

      <main className="content">
        <header className="topbar">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
       <div className="search-box">
  <input
    type="text"
    placeholder="Search by title or author..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  {searchTerm && (
    <ul className="dropdown">
      {filteredBooks.length > 0 ? (
        filteredBooks.map((book) => (
          <li key={book._id} className="dropdown-item">
            {book.title} — {book.author}
          </li>
        ))
      ) : (
        <li className="dropdown-item">No books found</li>
      )}
    </ul>
  )}
</div>



          <div className="profile">
            <span>Austin Robertson</span>
            <button className="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <section className="card">
          <h3>Book Details</h3>

          {loading ? (
            <p>Loading books...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Price $</th>
                  <th>Quantity</th>
                  <th>Total $</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr key={book._id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.isbn}</td>
                      <td>{book.price}</td>
                      <td>{book.quantity}</td>
                      <td>{book.price * book.quantity}</td>
                      <td>{book.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No books found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default Details;
