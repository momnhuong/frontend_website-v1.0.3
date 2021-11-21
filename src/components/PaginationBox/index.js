import React, { Component } from "react";
import { Pagination } from "antd";
import {
  listTicket,
  pagination,
  searchTicket,
} from "./../../features/myprofile/view/ticket/services";
import { connect } from "react-redux";
import { PAGINATION, PER_PAGE } from "../../constants/config";
import { getRequesterID } from "../../constants/common";
class PaginationBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyActive: 0,
      pagination: [],
    };
  }
  _onPagination = (number) => {
    {
      if (this.props.label === PAGINATION.TICKET) {
        let requester_id = getRequesterID();
        if (requester_id)
          this.props.dpClickP(
            `${this.props.params} requester_id:${requester_id}`,
            number
          );
        else this.props.dpClickP(this.props.params, number);
        this.props.dpPagination(number);
      }
    }
    this.setState({
      keyActive: number - 1,
    });
  };

  componentDidUpdate(preProps) {
    let pagination = [];
    if (preProps.count !== this.props.count) {
      for (let i = 0; i < this.props.count / PER_PAGE; i++) {
        pagination[i] = i + 1;
      }
      this.setState({
        pagination,
      });
    }
  }

  render() {
    return (
      // <TabContent>
      //   <TabPane tabId="1" className="pagination">
      //     <Pagination className="d-flex justify-content-center mt-3">
      //       {/* {_.map(this.state.pagination, (value, key) => { */}
      //       {_.map([1, 2, 3, 4, 5, 6], (value, key) => {
      //         const activeKey = key === this.state.keyActive ? true : false;
      //         return (
      //           <PaginationItem
      //             active={activeKey}
      //             key={key}
      //             onClick={() => this._onPagination(value)}
      //           >
      //             <PaginationLink href="#">{value}</PaginationLink>
      //           </PaginationItem>
      //         );
      //       })}
      //     </Pagination>
      //   </TabPane>
      // </TabContent>
      <Pagination
        total={this.props.count}
        showSizeChanger={false}
        onChange={(current) => this._onPagination(current)}
      />
    );
  }
}

const mapDispatchToProps = {
  // dpClickP: (number) => listTicket(number),
  dpList: (page) => listTicket(page),
  dpClickP: (params, number) => searchTicket(params, number),
  dpPagination: (number) => pagination(number),
};

export default connect(null, mapDispatchToProps)(PaginationBox);
