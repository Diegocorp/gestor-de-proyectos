import React, { useContext } from "react";
import "./styles.css";
import NavItem from "../NavItem";
import NavButton from "../NavButton";
import {
  faTachometerAlt,
  faUser,
  faTable,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { GuestContext } from "../../Utils/GuestContext";

const NavBar = () => {
  const { guest } = useContext(GuestContext);

  return (
    <div className={`d-flex flex-column`} id="Navbar__Container">
      <span className="mt-2 w-100 justify-content-center d-flex z-depth-3 position-relative">
        <NavButton />
      </span>

      <nav
        id="NavBar"
        className={
          "navbar navbar-expand-lg navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary h-100"
        }
      >
        <div
          className="container-fluid d-flex h-100 flex-column p-0 collapse navbar-collapse h-100"
          id="navbarSupportedContent"
        >
          <ul className="nav navbar-nav h-75 text-left pl-0 mt-3 justify-content-around d-flex flex-column">
            <NavItem
              id="statistics"
              icon={faTachometerAlt}
              title="Estadisticas"
            />
            <NavItem
              guest={guest ? true : false}
              id="me"
              icon={faUser}
              title="Perfil"
            />
            <NavItem id="projects" icon={faTable} title="Proyectos" />
            <NavItem
              guest={guest ? true : false}
              id="create"
              icon={faEdit}
              title="Gestor de Proyectos"
            />
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
