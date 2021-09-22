import React, { useContext } from "react";
import { UserContext } from "../../Utils/UserContext";
import { GuestContext } from "../../Utils/GuestContext";
import Dropdown from "react-bootstrap/Dropdown";
import TecLogo from "../../Assets/img/tecnm-1.png";
import "./styles.css";

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

const CustomDropdown = ({ logout, suggestionPage, userPage }) => {
  const { user } = useContext(UserContext);
  const { guest } = useContext(GuestContext);
  let userFullName = null;

  if (user.firstName) {
    userFullName = `${user.firstName} ${user.lastName}`;
  }
  return (
    <>
      <Dropdown className="bg-white">
        <Dropdown.Toggle as={CustomToggle}>
          <span className="d-none d-lg-inline text-gray-600 small">
            {userFullName || "Invitado"}
          </span>
          <img
            className="border rounded-circle img-profile ml-3"
            id="usrImg"
            src={user.imageURL || TecLogo}
            alt="profile"
          />
        </Dropdown.Toggle>
        <Dropdown.Menu className="rounded p-0 mt-2">
          {guest ? null : userPage}
          {suggestionPage}
          {logout}
        </Dropdown.Menu>
      </Dropdown>
      {""}
    </>
  );
};

export default CustomDropdown;
