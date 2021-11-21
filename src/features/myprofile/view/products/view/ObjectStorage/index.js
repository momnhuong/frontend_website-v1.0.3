import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";
import "./ObjectStorage.css";

const themeColors = ["#0071bc", "#0bcbff"];

const data = {
  labels: ["Used", "None"],
  datasets: [
    {
      label: "thinkpad-backup",
      data: [170, 30],
      backgroundColor: themeColors,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  responsive: true,
  responsiveAnimationDuration: 500,
  title: {
    display: true,
    text: "thinkpad-backup",
  },
};
const dataquota = {
  labels: ["Used", "None"],
  datasets: [
    {
      label: "Remaining",
      data: [40, 190],
      backgroundColor: themeColors,
    },
  ],
};

const optionsquota = {
  maintainAspectRatio: false,
  responsive: true,
  responsiveAnimationDuration: 500,
  title: {
    display: true,
    text: "Remaining",
  },
};

class ObjectStorage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="wrapper-ObjectStorage">
        <div className="card storage-usage">
          <p>Account ID: xxxxxxxxxxxxxxxxxxxxx</p>
          <div className="box-storage-usage">
            <div className="card-header title-storage-usage">
              <span>System health</span>
            </div>
            <div className="content-box-storage-usage">
              <Doughnut data={data} options={options} height={300} />
            </div>
          </div>
        </div>
        <div className="card quota">
          <p>Protocol: S3/Swift</p>
          <div className="box-quota">
            <div className="card-header title-quota">
              <span>Quota</span>
            </div>
            <div className="content-box-quota">
              <Doughnut data={dataquota} options={optionsquota} height={300} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ObjectStorage);
