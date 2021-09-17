import React, { useContext } from 'react';
import { SizeContext } from '../../Utils/SizeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight  } from '@fortawesome/free-solid-svg-icons'; 
import './styles.css';

const NavButton = ({toggle, setToggle}) => {
  const { size, setSize } = useContext(SizeContext);
  const onClick = () => {
    size ? setSize(false) : setSize(true)
  }

  return(
    <div 
    className="text-center d-md-inline text-white align-self-center mt-4"
    onClick={onClick}
    >
      <div id="collapseBtn" className="btn btn-block rounded-circle border-0">
        <span className="nav-link p-0 m-0">
          <FontAwesomeIcon id="arrowIcon" icon={ size ? faAngleRight : faAngleLeft}/>
        </span>
      </div>
    </div>
  )
};

export default NavButton;