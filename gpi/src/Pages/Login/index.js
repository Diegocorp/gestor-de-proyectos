/* eslint-disable no-undef */
import React, { useContext } from "react";
import "./styles.css";
import TecLogo from "../../Assets/img/tecnm-1.png";
import { Container, Row, Col, Card } from "react-bootstrap";
import AuthForm from "../../Components/AuthForm";
import { Link } from "react-router-dom";
import { GuestContext } from "../../Utils/GuestContext";

const Login = () => {
  const { setGuest } = useContext(GuestContext);
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col className="md-9 lg-12 xl-18">
          <Card className="shadow-lg o-hidden border-0 my-3">
            <Row>
              {/* Tecnm Image Logo */}
              <div className="col-lg-4 d-none d-lg-flex">
                <img id="iconLogo" src={TecLogo} alt="" />
              </div>
              {/* Account login field */}
              <AuthForm />
              {/* Guest login */}
              <div className="col-lg-4 guest-box">
                <div className="p-5 mb-0 section-guest">
                  <div className="text-center">
                    <h4 className="text-dark mb-4">¡Entrar como invitado!</h4>
                  </div>
                  <form className="user">
                    <Link
                      id="guestBtn"
                      className="btn btn-primary btn-block text-white btn-user rounded-pill py-2"
                      role="button"
                      onClick={() => setGuest(true)}
                      to="/guest/statistics"
                    >
                      Entrar
                    </Link>
                  </form>
                </div>
              </div>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
