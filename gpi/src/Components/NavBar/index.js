import React, { useContext } from "react";
import { SizeContext } from "../../Utils/SizeContext";
import TecLogo from "../../Assets/img/tecnm-1.png";
import "./styles.css";
import NavItem from "../NavItem";
import NavButton from "../NavButton";
import { Link, useParams } from "react-router-dom";
import {
  faTachometerAlt,
  faUser,
  faTable,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ guestMode }) => {
  const { size } = useContext(SizeContext);
  let { userID } = useParams();

  const fullWidth = { width: "15em", minHeight: "100%", height: "100%" };
  const reduced = { width: "7em", minHeight: "100%", height: "100%" };

  return (
    <nav
      id="NavBar"
      className={
        "navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary mt-1"
      }
      style={size ? reduced : fullWidth}
    >
      <div className="container-fluid d-flex flex-column p-0">
        <Link
          className="navbar-brand text-justify d-flex justify-content-center align-items-center sidebar-brand m-0"
          to={guestMode ? `/guest/statistics` : `/user/${userID}/statistics`}
        >
          <div className="sidebar-brand-icon rotate-n-0">
            <img id="iconSup" src={TecLogo} alt="" />
          </div>
          {size ? null : (
            <div className="sidebar-brand-text mx-3 font-weight-bold">
              <span>GPI</span>
            </div>
          )}
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul className="nav navbar-nav text-light text-left pl-0 mt-3 justify-content-start">
          <NavItem
            id="statistics"
            icon={faTachometerAlt}
            title="Estadisticas"
          />
          <NavItem guestMode={guestMode} id="me" icon={faUser} title="Perfil" />
          <NavItem id="projects" icon={faTable} title="Proyectos" />
          <NavItem
            guestMode={guestMode}
            id="create"
            icon={faEdit}
            title="Gestor de Proyectos"
          />
        </ul>
        <NavButton />
      </div>
    </nav>
  );
};

export default NavBar;
