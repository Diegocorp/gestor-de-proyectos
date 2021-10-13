import React, { useContext } from "react";
import { SizeContext } from "../../Utils/SizeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { ProjectContext } from "../../Utils/ProjectContext";

const NavItem = (props) => {
  let { userID, page } = useParams();
  const { size } = useContext(SizeContext);
  const { setProject } = useContext(ProjectContext);
  const styleSelected = "nav-link active font-weight-bold";
  const styleUnSelected = "nav-link";
  const reducedNav =
    "d-flex flex-column justify-content-center align-items-center ";

  return (
    <li
      className="nav-item mt-2 "
      role="presentation"
      style={props.guest ? { display: "none" } : null}
      onClick={() => {
        setProject({});
      }}
    >
      <Link
        id={props.id}
        className={
          (size ? reducedNav : "") +
          (page === `${props.id}` ? styleSelected : styleUnSelected)
        }
        style={page === `${props.id}` ? {} : { color: "rgba(255,255,255,.5)" }}
        to={!userID ? `/guest/${props.id}` : `/user/${userID}/${props.id}`}
      >
        {props.icon ? (
          <FontAwesomeIcon
            className={size ? "text-align-center" : ""}
            icon={props.icon}
          />
        ) : null}
        <span className={size ? "h6" : "pl-2 h5"}>{props.title}</span>
      </Link>
      {props.children}
    </li>
  );
};

export default NavItem;
