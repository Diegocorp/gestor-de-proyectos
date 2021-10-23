import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { SizeContext } from "../../Utils/SizeContext";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import NavItem from "../NavItem";
import "./styles.css";
import { GuestContext } from "../../Utils/GuestContext";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <span
    unselectable="on"
    id="dropdown-custom"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </span>
));

const NavButton = ({ hamburger }) => {
  const { guest } = useContext(GuestContext);
  const { size, setSize } = useContext(SizeContext);
  const isMobile = useMediaQuery({ query: `(max-width: 1200px)` });

  const onClick = () => {
    if (isMobile) {
    } else {
      setSize(!size);
    }
  };

  return (
    <div
      className="text-center d-md-inline text-white align-self-center"
      onClick={onClick}
    >
      {hamburger ? (
        isMobile ? (
          <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <Dropdown
                className="bg-white m-0 p-0"
                style={{ position: "relative" }}
              >
                <Dropdown.Toggle as={CustomToggle} className="navbar-toggler">
                  <div id="collapseBtn" className="btn btn-block border-0">
                    <span className="nav-link p-0 m-0">
                      <FontAwesomeIcon id="burger" icon={faBars} />
                    </span>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="rounded p-0 mt-2">
                  <Dropdown.Item>
                    <NavItem id="statistics" title="Estadisticas" />
                  </Dropdown.Item>
                  {guest ? null : (
                    <Dropdown.Item>
                      <NavItem id="me" title="Perfil" />
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item>
                    <NavItem id="projects" title="Proyectos" />
                  </Dropdown.Item>
                  {guest ? null : (
                    <Dropdown.Item>
                      <NavItem id="create" title="Gestor de Proyectos" />
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              {""}
            </nav>
          </>
        ) : (
          <div id="collapseBtn" className="btn btn-block border-0">
            <span className="nav-link p-0 m-0">
              <FontAwesomeIcon id="burger" icon={faBars} />
            </span>
          </div>
        )
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
