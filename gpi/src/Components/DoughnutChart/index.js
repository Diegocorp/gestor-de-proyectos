import React from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class ChartsPage extends React.Component {
state = {
  dataDoughnut: {
    labels: ["Desarrollo de software", "Paquete tecnologico", "Servicio tecnologico"],
    datasets: [
      {
        data: [this.props.projectCounter['dds'], this.props.projectCounter['pt'], this.props.projectCounter['st']],
        backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"]
      }
    ]
  }
}

render() {
    return (
    <MDBContainer>
      <Doughnut data={this.state.dataDoughnut} options={{ responsive: true }} />
    </MDBContainer>
    );
  }
}

export default ChartsPage;