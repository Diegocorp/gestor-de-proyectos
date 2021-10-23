import React, { useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { UserContext } from "../../Utils/UserContext";
import { Link } from "react-router-dom";
import NavButton from "../NavButton";
import CustomDropdown from "../CustomDropdown";
import "./styles.css";
import { GuestContext } from "../../Utils/GuestContext";
import { SizeContext } from "../../Utils/SizeContext";
import { Dropdown } from "react-bootstrap";

function Header() {
  const { setUser } = useContext(UserContext);
  const { setGuest } = useContext(GuestContext);
  const { size, setSize } = useContext(SizeContext);
  const isMobile = useMediaQuery({ query: `(max-width: 1200px)` });

  useEffect(() => {
    if (isMobile) {
      setSize(true);
      console.log("mediakey in use");
    }
    console.log(size);
  }, [isMobile]);

  function RenderLogout() {
    return (
      <Dropdown.Item className="ml-auto d-block btn p-0 rounded">
        <Link
          className="w-100 dropdown-item m-0 rounded-lg"
          onClick={handleLogout}
          to="/login"
        >
          Logout
        </Link>
      </Dropdown.Item>
    );
  }

  function RenderUser() {
    return (
      <Dropdown.Item className="ml-auto d-block btn  p-0 rounded rounded-bottom-lg">
        <Link className="w-100 dropdown-item m-0 rounded-lg" to={`me`}>
          Perfil
        </Link>
      </Dropdown.Item>
    );
  }

  function RenderSuggestion() {
    return (
      <Dropdown.Item className="ml-auto d-block btn  p-0 rounded rounded-bottom-lg">
        <Link className="w-100 dropdown-item m-0 rounded-lg" to={`Suggestions`}>
          Sugerencias
        </Link>
      </Dropdown.Item>
    );
  }

  function handleLogout() {
    localStorage.removeItem("ACCESS_TOKEN");
    setUser({});
    setGuest(false);
  }

  return (
    <nav id="NavBar" className=" shadow w-100 d-flex">
      {size ? (
        <NavButton
          className="navbar-toggler"
          hamburger
          toggle="collapse"
          target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
      ) : null}

      <div
        className=" d-flex justify-content-end m-0 p-0"
        style={{ width: "100%" }}
      >
        <CustomDropdown
          logout={RenderLogout()}
          userPage={RenderUser()}
          suggestionPage={RenderSuggestion()}
        />
      </div>
    </nav>
  );
}

export default Header;
