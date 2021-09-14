import React from 'react';
import TecLogo from '../../Assets/img/tecnm-1.png';
import { Link } from 'react-router-dom';
import '../Login/styles.css';

function Forgot(){
  return(
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-12 col-xl-10">
          <div className="card shadow-lg o-hidden border-0 my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-5 d-none d-lg-flex">
                  <img id="iconLogo" src={TecLogo} alt=""/>
                </div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h4 className="text-dark mb-2">¿Olvidastes tu contraseña?</h4>
                      <p className="mb-4">Lo comprendemos, a veces las cosas suceden. 
                      ¡Sólo ingresa tu correo electrónico abajo y te enviaremos un vínculo para que puedas cambiar tu contraseña!</p>
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input 
                          className="form-control form-control-user rounded-pill" 
                          type="email" 
                          id="exampleInputEmail" 
                          aria-describedby="emailHelp" 
                          placeholder="Correo Electrónico..." 
                          name="email" />
                      </div>
                      <button 
                        className="btn btn-primary btn-block text-white btn-user rounded-pill py-2"
                        type="submit">Cambiar Contraseña
                      </button>
                    </form>
                    <div className="text-center">
                      <hr/>
                      <Link className="small" to="/register">¡Crea una cuenta!</Link>
                    </div>
                    <div className="text-center">
                      <Link className="small" to="/login">¿Ya tienes una cuenta? ¡Ingresa!</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Forgot;