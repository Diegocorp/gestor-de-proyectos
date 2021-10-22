import React, { useContext } from "react";
import { SizeContext } from "../../Utils/SizeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const NavButton = ({ toggle, setToggle, hamburger }) => {
  const { size, setSize } = useContext(SizeContext);

  const onClick = () => {
    setSize(!size);
  };

  return (
    <div
      className="text-center d-md-inline text-white align-self-center"
      onClick={onClick}
    >
      {hamburger ? (
        <div id="collapseBtn" className="btn btn-block border-0">
          <span className="nav-link p-0 m-0">
            <FontAwesomeIcon id="burger" icon={faBars} />
          </span>
        </div>
      ) : (
        <div id="collapseBtn" className="btn btn-block rounded-circle border-0">
          <span className="nav-link p-0 m-0">
            <FontAwesomeIcon id="arrowIcon" icon={faAngleLeft} />
          </span>
        </div>
      )}
    </div>
  );
};

export default NavButton;
