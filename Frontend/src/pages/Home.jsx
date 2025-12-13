import { useState } from "react";
import { Link, Links, useNavigate } from "react-router-dom";
import "./Home.css";
import NavBar from "../components/Navbar";
import Header from "../components/Header";

export default function Home() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/books/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          title,
          author,
          isbn,
          price,
          quantity,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add book");
      }

      alert("Book added successfully");
     

      
      setTitle("");
      setAuthor("");
      setIsbn("");
      setPrice("");
      setQuantity("");
      setDescription("");
      navigate("/detail");
  
    } catch (err) {
      setError(err.message);
    }
  };

const handleGenrateDescription = async (e) => {
  e.preventDefault();
  setError("");

  if (!title || !author) {
    setError("Title and Author are required");
    return;
  }

  try {
    const response = await fetch( 
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyCms_HbJRtSU-x3mdS4qXH-UEKRP-3ZjT0`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Write a short and engaging book description (3–4 lines).
Title: ${title}
Author: ${author}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const description =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!description) {
      throw new Error("Failed to generate description");
      setDescription("This is a sample description.");
    }

    setDescription(description.trim());
  } catch (err) {
    setError("AI generation failed");
  }
};


 

  return (
    <div className="dashboard">
        <NavBar/>

      <main className="content">
        <Header/>

        <section className="card">
          <h3>Add Book</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div>
                <label>Title *</label>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Author *</label>
                <input
                  type="text"
                  placeholder="Enter author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div>
                <label>ISBN *</label>
                <input
                  type="text"
                  placeholder="Enter ISBN"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Price *</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Quantity *</label>
                <input
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
            </div>

            <label>About the book (short description) *</label>
            <button onClick={handleGenrateDescription}>Genetate with AI</button>
            <textarea
              placeholder="Enter about"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>

            {error && <p className="error">{error}</p>}

            <div className="actions">
              <button type="submit" className="submit">
                Submit
              </button>
              <button
                type="button"
                className="cancel"
                onClick={() => navigate("/books")}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}


