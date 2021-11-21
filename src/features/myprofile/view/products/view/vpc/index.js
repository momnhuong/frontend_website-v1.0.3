import React, { Component } from "react";
import Chart from "react-apexcharts";
import * as Icon from "react-feather";
import { connect } from "react-redux";
import { IMAGES } from "../../../../../../assets";
import "./vpc.css";

class VPC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cpu: {
        chart: {
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "70%",
            },
          },
        },
        labels: ["CPU"],
      },
      memory: {
        chart: {
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "70%",
            },
          },
        },
        labels: ["Memory"],
      },
      storage: {
        chart: {
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "70%",
            },
          },
        },
        labels: ["Storage"],
      },
      series: [90],
    };
  }

  render() {
    return (
      <div className="wrapper-vpc">
        <div className="info-vpc">
          <div className="card usdc-vdc">
            <div className="title-usdc">
              <Icon.Cloud style={{ marginRight: 5 }} /> <span>usdc-vdc01</span>
            </div>
            <div className="title-usdc">
              <div className="title-usdc-left">
                <Icon.Server style={{ marginRight: 5 }} /> <span>usdc</span>
              </div>
              <div className="title-usdc-left">
                <Icon.MapPin /> <span>10.72.1.2</span>
              </div>
            </div>
            <div className="row-chart">
              <div className="detail-applications">
                <p>Applications</p>
                <span>2</span>
                <br />
                <p>vApps</p>
                <br />
                <span>11 of 11</span>
                <br />
                <p>Running VMs </p>
              </div>
              <div className="box-chart">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Chart
                    options={this.state.cpu}
                    series={this.state.series}
                    width={170}
                    type="radialBar"
                    className="chart-demo"
                  />
                  <span style={{ textAlign: "center" }}>50 GHz allocated</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Chart
                    options={this.state.memory}
                    series={[80]}
                    width={170}
                    type="radialBar"
                    className="chart-demo"
                  />
                  <span style={{ textAlign: "center" }}>128 GB allocated</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Chart
                    options={this.state.storage}
                    series={[65]}
                    type="radialBar"
                    width={170}
                    className="chart-demo"
                  />
                  <span style={{ textAlign: "center" }}>1 TB allocated</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card detail-vdc">
            <div className="detail">
              <div className="detail-title">Name</div>
              <div className="detail-amt">usdc-edge01</div>
            </div>
            <div className="detail">
              <div className="detail-title">Description</div>
              <div className="detail-amt">-</div>
            </div>
            <div className="detail status">
              <div className="detail-title">Status</div>
              <div className="detail-amt">
                <Icon.CheckCircle />
              </div>
            </div>
            <div className="detail">
              <div className="detail-title">Distributed Routing</div>
              <div className="detail-amt">Enabled</div>
            </div>
            <div className="detail">
              <div className="detail-title">FIPS Mode</div>
              <div className="detail-amt">Disabled</div>
            </div>
            <div className="detail">
              <div className="detail-title">Edge Gateway Configuration</div>
              <div className="detail-amt">Large</div>
            </div>
            <div className="detail">
              <div className="detail-title">High Availability</div>
              <div className="detail-amt">Disabled</div>
            </div>
            <div className="detail">
              <div className="detail-title">Syslog Server Settings</div>
              <div className="detail-amt">-</div>
            </div>
          </div>
        </div>
        <div className="card recent-tasks">
          <div className="title-recent-task">
            <span>Recent tasks</span>
            <Icon.ChevronsDown />
          </div>
          <div className="box-table">
            <div className="title-table">
              <div className="item-title task">task</div>
              <div className="item-title status">status</div>
              <div className="item-title type">type</div>
              <div className="item-title initiator">initiator</div>
              <div className="item-title start-time">start time</div>
              <div className="item-title completion-time">completion time</div>
              <div className="item-title service-namespace">
                service namespace
              </div>
            </div>
            <div className="detail-table">
              <img
                src={IMAGES.loading_icon}
                className="img-responsive"
                alt="loadding"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(VPC);
