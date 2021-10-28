import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { ProjectContext } from "../../Utils/ProjectContext";

const NavItem = (props) => {
  let { userID, page } = useParams();
  const { setProject } = useContext(ProjectContext);
  const isMobile = useMediaQuery({ query: `(max-width: 1200px)` });
  const styleSelected = "nav-link active ";
  const styleUnSelected = "nav-link";
  const Nav =
    "d-flex flex-column justify-content-center text-center align-items-center text-decoration-none ";

  return (
    <li
      className="nav-item d-flex flex-column align-items-center justify-content-center "
      role="presentation"
      style={props.guest ? { display: "none" } : null}
      onClick={() => {
        setProject({});
      }}
    >
      <Link
        id={props.id}
        className={
          Nav +
          (isMobile
            ? ""
            : page === `${props.id}`
            ? styleSelected
            : styleUnSelected)
        }
        style={
          isMobile
            ? null
            : page === `${props.id}`
            ? {}
            : { color: "rgba(255,255,255,.5)" }
        }
        to={!userID ? `/guest/${props.id}` : `/user/${userID}/${props.id}`}
      >
        {props.icon ? <FontAwesomeIcon icon={props.icon} /> : null}
        <span
          className={"h6 " + (page === `${props.id}` ? "font-weight-bold" : "")}
        >
          {props.title}
        </span>
      </Link>
      {props.children}
    </li>
  );
};

export default NavItem;
