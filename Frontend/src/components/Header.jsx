import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = ()=>{
    const navigate = useNavigate();
 const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

    return(
          <header className="topbar">
          <input type="text" placeholder="Search..." />
          <div className="profile">
            <span>Austin Robertson</span>
             <button className="button" onClick={handleLogout}>Logout</button>
          </div>
        </header>
    )
}

export default Header;