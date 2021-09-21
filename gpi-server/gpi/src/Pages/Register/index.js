import React from 'react';
import TecLogo from '../../Assets/img/tecnm-1.png';
import RegisterForm from '../../Components/RegisterForm'
import '../Login/styles.css';

function Register(){
  return(
    <div className="container">
      <div className="card shadow-lg o-hidden border-0 my-5">
        <div className="card-body p-0">
          <div className="row">
            <div className="col-lg-5 d-none d-lg-flex">
              <img id="iconLogo" src={TecLogo} alt=""/>
            </div>
            <RegisterForm/>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Register;