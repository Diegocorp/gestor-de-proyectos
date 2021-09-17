import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
//import 'mdbreact/dist/css/mdb.css';

class ChartsPage extends React.Component {
  state = {
    dataBar: {
      labels: ["Cancelados", "En desarrollo", "Finalizados", "Implementados"],
      datasets: [
        {
          label: "",
          data: [
            this.props.projectCounter["cancel"],
            this.props.projectCounter["develop"],
            this.props.projectCounter["finish"],
            this.props.projectCounter["implement"],
          ],
          backgroundColor: ["#f0ad4e", "#36b9cc", "#1cc88a", "#4e73df"],
          borderWidth: 0,
          borderColor: [
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(113, 205, 205, 1)",
            "rgba(170, 128, 252, 1)",
            "rgba(255, 177, 101, 1)",
          ],
        },
      ],
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        dataSet: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };

  render() {
    return (
      <MDBContainer>
        <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
      </MDBContainer>
    );
  }
}

export default ChartsPage;
