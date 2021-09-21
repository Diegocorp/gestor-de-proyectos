import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import BarChart from '../../Components/BarChart';
import DoughnutChart from '../../Components/DoughnutChart';
import apis from '../../API';
import Spinner from 'react-bootstrap/Spinner';

let projectCounter = {
  cancel: 0,
  develop: 0,
  finish: 0, 
  implement: 0,
  dds: 0,
  pt: 0,
  st: 0
};

function Statistics() {
  const [projectsData, setProjectsData] = useState({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData () {
      await apis.getProjects().then(result => {
        projectCounter = {
          cancel: 0,
          develop: 0,
          finish: 0, 
          implement: 0,
          dds: 0,
          pt: 0,
          st: 0
        };
        
        result.map(async t => {
          if(t.statusProject === "Cancelado"){ 
            projectCounter['cancel'] = projectCounter['cancel'] + 1
          }
          if(t.statusProject === "En desarrollo"){
            projectCounter['develop'] = projectCounter['develop'] + 1
          }
          if(t.statusProject === "Finalizado"){
            projectCounter['finish'] = projectCounter['finish'] + 1
          }
          if(t.statusProject === "Implementado"){
              projectCounter['implement'] = projectCounter['implement'] + 1
          }
          if(t.typeProyect === "Desarrollo de software"){
              projectCounter['dds'] = projectCounter['dds'] + 1
          }
          if(t.typeProyect === "Paquete tecnologico"){
              projectCounter['pt'] = projectCounter['pt'] + 1
          }
          if(t.typeProyect === "Servicio tecnologico"){
              projectCounter['st'] = projectCounter['st'] + 1
          }
          return null;
        }) 
        setLoading(false);
        setProjectsData(result);
      })      
    }
    fetchData()
  }, [])

  return(
    <Container fluid>
      <div className="d-sm-flex justify-content-between align-items-center mb-4">
        <h3 className="font-weight-bold mb-0">Estadisticas</h3>
      </div>
      <Row>
        <Col className="col-md-6 col-xl-3 mb-4">
          <Card className="card shadow border-left-primary py-2">
            <Card className="card-body">
              <Row className="align-items-center no-gutters">
                <Col className="mr-2">
                  <div className="text-uppercase text-primary font-weight-bold text-xs mb-1">
                    <span>Proyectos Implementados</span>
                  </div>
                  <div className="text-dark font-weight-bold h5 mb-0">
                      <span id="spanImplement">{projectCounter['implement']}</span>
                  </div>
                </Col>
                <Col className="col-auto"><i className="fas fa-calendar fa-2x text-gray-300"></i></Col>
              </Row>
            </Card>
          </Card>
        </Col>
        <Col className="col-md-6 col-xl-3 mb-4">
          <Card className="shadow border-left-success py-2">
            <Card className="card-body">
              <Row className="align-items-center no-gutters">
                <Col className=" mr-2">
                  <div className="text-uppercase text-success font-weight-bold text-xs mb-1">
                    <span>Proyectos Finalizados</span>
                  </div>
                  <div className="text-dark font-weight-bold h5 mb-0">
                    <span id="spanFinish">{projectCounter['finish']}</span>
                  </div>
                </Col>
                <Col className="col-auto"><i className="fas fa-dollar-sign fa-2x text-gray-300"></i></Col>
              </Row>
            </Card>
          </Card>
        </Col>
        <Col className="col-md-6 col-xl-3 mb-4">
          <Card className="shadow border-left-info py-2">
            <Card className="card-body">
              <Row className="row align-items-center no-gutters">
                <Col className="mr-2">
                  <div className="text-uppercase text-info font-weight-bold text-xs mb-1">
                    <span>Proyectos en desarrollo</span>
                  </div>
                  <div className="text-dark font-weight-bold h5 mb-0">
                    <span id="spanDevelop">{projectCounter['develop']}</span>
                  </div>
                </Col>
                <Col className="col-auto"><i className="fas fa-clipboard-list fa-2x text-gray-300"></i></Col>
              </Row>
            </Card>
          </Card>
        </Col>
        <Col className="col-md-6 col-xl-3 mb-4">
          <Card className="shadow border-left-info py-2">
            <Card className="card-body">
              <Row className="row align-items-center no-gutters">
                <Col className="mr-2">
                <div className="text-uppercase text-warning font-weight-bold text-xs mb-1">
                  <span>Proyectos Cancelados</span>
                </div>
                <div className="text-dark font-weight-bold h5 mb-0">
                  <span id="spanCancel">{projectCounter['cancel']}</span>
                </div>
              </Col>
                <Col className="col-auto"><i className="fas fa-clipboard-list fa-2x text-gray-300"></i></Col>
              </Row>
            </Card>
          </Card>
        </Col>
      </Row>        
    <Row>          
      {/* BarChart */}
      <Col className="col-lg-7 col-xl-7">
        <Card className="shadow mb-4">
        <Card className="card-header d-flex justify-content-between align-items-center">
            <h6 className="text-primary font-weight-bold m-0">Progreso en los proyectos</h6>
        </Card>
        <Card className="card-body">
            { loading ? (<Spinner animation="border" role="status" />
            ) : (
            <BarChart projectsData={projectsData} projectCounter={projectCounter}/>
            )}
        </Card>
        </Card>
      </Col>
      {/* DoughnutChart */}
      <Col className="col-lg-5 col-xl-5">
        <Card className="card shadow mb-4">
        <Card className="card-header d-flex justify-content-between align-items-center">
            <h6 className="text-primary font-weight-bold m-0">Tipos de Proyectos</h6>
        </Card>
        <Card className="card-body">
            { loading ? (
            <Spinner animation="border" role="status" />
            ) : (
            <DoughnutChart projectsData={projectsData} projectCounter={projectCounter}/>
            )
            }
        </Card>               
        </Card>
      </Col>
    </Row>
  </Container>
  )
}

export default Statistics;