import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Doughnut } from "react-chartjs-2";
import * as Icon from "react-feather";
import { connect } from "react-redux";
import { IMAGES } from "../../../../../../assets";
import "./draas.css";

const themeColors = ["#0071bc"];
const doughnutchartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  responsiveAnimationDuration: 500,
  title: {
    display: false,
    text: "Predicted world population (millions) in 2050",
  },
  cutoutPercentage: 90,
};

// Chart Data
const doughnutchartData = {
  labels: ["1 PRO violations"],
  datasets: [
    {
      label: "My First dataset",
      data: [2478],
      backgroundColor: themeColors,
    },
  ],
};
class DRaaS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          height: 350,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "70%",
            },
          },
        },
        labels: ["No replications"],
      },
      series: [50],
    };
  }

  render() {
    return (
      <div className="container-fluid wrapper-DRaaS">
        <div className="topology-system-health">
          <div className="card topology">
            <div className="card-header title-topology">
              <span>topology</span>
            </div>
            <div className="content-topology">
              <div className="content-topology-left">
                <div className="icon-build">
                  <img
                    src={IMAGES.img_company}
                    className="img-responsive"
                    alt="topology"
                  />
                  <span>
                    1 On- <br /> Prem site
                  </span>
                  <Icon.Play className="icon-play" />
                  <Icon.Play className="icon-play-down" />
                </div>
                <div className="icon-build icon-cloud">
                  <img
                    src={IMAGES.img_cloud}
                    className="img-responsive"
                    alt="img_cloud"
                  />
                  <span>
                    0 Cloud <br /> sites
                  </span>
                  <Icon.Play className="icon-play-down" />
                  <Icon.Play className="icon-play" />
                </div>
              </div>
              <div className="content-topology-right">
                <img
                  src={IMAGES.img_cloud}
                  className="img-responsive"
                  alt="img_cloud"
                />
                USDC
              </div>
            </div>
          </div>
          <div className="card system-health">
            <div className="card-header title-system-health">
              <span>System health</span>
            </div>
            <div className="content-system-health">
              <div className="item-system-health vApp">
                <div className="img-vApp">
                  <Icon.CheckCircle />
                </div>
                <div className="content-vApp">
                  <p>vApp Replication Manager</p>
                  <span>Tunneting</span>
                  <p>Online</p>
                </div>
              </div>
              <div className="item-system-health vCloud">
                <div className="img-vApp">
                  <Icon.CheckCircle />
                </div>
                <div className="content-vApp">
                  <p>vCloud Director</p>
                  <span>vpc.vcpp.vn</span>
                  <p>Online</p>
                </div>
              </div>
              <div className="item-system-health lookup-service">
                <div className="img-vApp">
                  <Icon.CheckCircle />
                </div>
                <div className="content-vApp">
                  <p>Lookup Service</p>
                  <span>vpc-mgmt-vc01.vcpp.lookup</span>
                  <p>Online</p>
                </div>
              </div>
              <div className="item-system-health Replicators">
                <div className="img-vApp">
                  <Icon.CheckCircle />
                </div>
                <div className="content-vApp">
                  <p>Replicators</p>
                  <span>2 replicator(s)</span>
                  <p>Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="VM-Cloud">
          <div className="card on-prem-vm">
            <div className="card-header title-on-prem-vm">
              <img
                src={IMAGES.img_company}
                className="img-responsive"
                alt="img title"
              />
              <span>On-Prem VM replication status</span>
            </div>
            <div className="content-on-prem-vm">
              <span>Incoming VNs</span>
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="radialBar"
                className="chart-demo"
              />
              <span>Outgoing VMs</span>
              <div>
                <Doughnut
                  height={300}
                  data={doughnutchartData}
                  options={doughnutchartOptions}
                />
              </div>
            </div>
          </div>
          <div className="card on-vm-cloud">
            <div className="card-header title-on-prem-vm">
              <img
                src={IMAGES.img_company}
                className="img-responsive"
                alt="img title"
              />
              <span>On-Prem VM replication status</span>
            </div>
            <div className="content-on-prem-vm">
              <div className="item-content-on-prem-vm">
                <span>Incoming vApps</span>
                <Chart
                  options={this.state.options}
                  series={this.state.series}
                  type="radialBar"
                  className="chart-demo"
                />
              </div>
              <div className="item-content-on-prem-vm">
                <span>Incoming VMs</span>
                <Chart
                  options={this.state.options}
                  series={this.state.series}
                  type="radialBar"
                  className="chart-demo"
                />
              </div>
              <div className="item-content-on-prem-vm">
                <span>Outgoing vApps</span>
                <Chart
                  options={this.state.options}
                  series={this.state.series}
                  type="radialBar"
                  className="chart-demo"
                />
              </div>
              <div className="item-content-on-prem-vm">
                <span>Outgoing VMs</span>
                <Chart
                  options={this.state.options}
                  series={this.state.series}
                  type="radialBar"
                  className="chart-demo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DRaaS);
