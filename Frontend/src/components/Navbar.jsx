import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("add");

  const handleaddClick = () => {
    setActive("add");
    navigate("/dashboard");
  };

  const handleBookClick = () => {
    setActive("book");
    navigate("/detail");
  };

  return (
    <aside className="sidebar">
      <h2 className="logo">Hope UI</h2>
      <ul className="menu">
        <li
          onClick={handleaddClick}
          className={active === "add" ? "active" : "inactive"}
        >
          Add Book
        </li>

        <li
          onClick={handleBookClick}
          className={active === "book" ? "active" : "inactive"}
        >
          Book Details
        </li>
      </ul>
    </aside>
  );
};

export default NavBar;
