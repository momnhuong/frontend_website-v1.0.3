import React, { Component } from "react";
import * as Icon from "react-feather";
import { connect } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "./styles.css";

class BackupService extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderItem() {
    return (
      <div className="row wrapper-item">
        <div className="card item">
          <div className="title-item">Protected</div>
          <div className="row-item">
            <div className="title-row-item">vApps</div>
            <div className="content-row-item">2</div>
          </div>
          <div className="row-item">
            <div className="title-row-item">VMs</div>
            <div className="content-row-item">3</div>
          </div>
          <div className="row-item">
            <div className="title-row-item">VMs size</div>
            <div className="content-row-item">2.2 GB</div>
          </div>
        </div>
        <div className="card item">
          <div className="title-item">JOBS</div>
          <div className="row-item">
            <div className="title-row-item">Jobs</div>
            <div className="content-row-item">1</div>
          </div>
          <div className="row-item">
            <div className="title-row-item">Max duration</div>
            <div className="content-row-item">14 min</div>
          </div>
          <div className="row-item">
            <div className="title-row-item">Average speed</div>
            <div className="content-row-item">32 MB/s</div>
          </div>
        </div>
        <div className="card item">
          <div className="title-item">Backup storage</div>
          <div className="row-item">
            <div className="title-row-item">Status</div>
            <div className="content-row-item">
              <Icon.CheckSquare />
            </div>
          </div>
          <div className="row-item">
            <div className="title-row-item">Quota</div>
            <div className="content-row-item">200 GB</div>
          </div>
          <div className="row-item">
            <div className="title-row-item">Used</div>
            <div className="content-row-item">1.1 GB</div>
          </div>
        </div>
        <div className="card item">
          <div className="title-item">Last 7 days</div>
          <div className="row-item">
            <div className="title-row-item">
              <Icon.CheckSquare />
              Successes
            </div>
            <div className="content-row-item">1</div>
          </div>
          <div className="row-item">
            <div className="title-row-item">Warnnings</div>
            <div className="content-row-item">0</div>
          </div>
          <div className="row-item">
            <div className="title-row-item">Errors</div>
            <div className="content-row-item">0</div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="wrapper-backup-service">
        <Tabs>
          <TabList>
            <Tab>Last 24 hours</Tab>
            <Tab>Last 7 days</Tab>
          </TabList>

          <TabPanel>{this.renderItem()}</TabPanel>
          <TabPanel>{this.renderItem()}</TabPanel>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BackupService);
