import React from 'react';
import { Link } from 'react-router-dom';


function Header(props) {
  function RenderLogout() {
    return(
      <div className="ml-auto">
        <Link 
          className="btn btn-danger" 
          onClick={handleLogout} 
          to="/login">
        Logout
        </Link>
      </div>
    )
  }

  function handleLogout() {
    localStorage.removeItem("ACCESS_TOKEN");
  }

  return(
    <nav className="navbar navbar-dark bg-primary">
      <div className="row col-12 d-flex justify-content-center text-white">
        <span className="h3">{props.title || "default"}</span>
        <RenderLogout />
      </div>
    </nav>
  )
}

export default Header;