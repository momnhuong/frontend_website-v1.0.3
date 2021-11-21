import React, { Component } from "react";
import * as Icon from "react-feather";
import { ChevronDown } from "react-feather";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  TabContent,
  TabPane,
  UncontrolledDropdown,
} from "reactstrap";
import { showPopup } from "../../../../../app/services";
import { IMAGES } from "../../../../../assets";
import { UI } from "../../../../../components";
import { replaceTiengVietCoDau } from "../../../../../utils/fotmat";
import "./transaction.css";

const listTransition = [
  {
    id: 1,
    code: "0050",
    name: "Apple Watch series 4 GPS",
    price: 30,
    datetime: "30/4/2020",
    to: "/detailtransaction",
    status: "Chưa thanh toán",
    itemTransaction: [
      {
        nametask: "Website Redesign",
        hours: 60,
        rate: "15 USD",
        amout: "90000 USD",
      },
      {
        nametask: "Website Redesign",
        hours: 20,
        rate: "12 USD",
        amout: "24000 USD",
      },
    ],
  },
  {
    id: 2,
    code: "0051",
    name: "Beats HeadPhones",
    price: 30,
    datetime: "30/4/2020",
    to: "/detailtransaction",
    status: "Đã thanh toán",
    itemTransaction: [
      {
        nametask: "Website Redesign",
        hours: 60,
        rate: "15 USD",
        amout: "90000 USD",
      },
      {
        nametask: "Website Redesign",
        hours: 20,
        rate: "12 USD",
        amout: "24000 USD",
      },
    ],
  },
  {
    id: 3,
    code: "0052",
    name: "Altec Lansing - Bluetooth Speaker",
    price: 30,
    datetime: "30/4/2020",
    to: "/detailtransaction",
    status: "Chờ thanh toán",
    itemTransaction: [
      {
        nametask: "Website Redesign",
        hours: 60,
        rate: "15 USD",
        amout: "90000 USD",
      },
      {
        nametask: "Website Redesign",
        hours: 20,
        rate: "12 USD",
        amout: "24000 USD",
      },
    ],
  },
  {
    id: 4,
    code: "0053",
    name: "Altec Lansing - Bluetooth Speaker",
    price: 30,
    datetime: "30/4/2020",
    to: "/detailtransaction",
    status: "Đã thanh toán",
    itemTransaction: [
      {
        nametask: "Website Redesign",
        hours: 60,
        rate: "15 USD",
        amout: "90000 USD",
      },
      {
        nametask: "Website Redesign",
        hours: 20,
        rate: "12 USD",
        amout: "24000 USD",
      },
    ],
  },
];

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      checkAll: false,
      selectItems: [],
      searchStr: undefined,
    };
  }
  handleChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    if (value === "") {
      console.log("handleChange", value);
      this.setState({
        searchStr: undefined,
      });
    }
    if (value !== "") {
      this.setState(
        {
          [name]: value,
        },
        () => {
          console.log("searchStr", this.state.searchStr);
        }
      );
    }
  };

  onChangeSelectAll = (select) => {
    if (listTransition && listTransition.length > 0) {
      const lstlistTransition =
        listTransition &&
        listTransition
          .map((s) => s && s.listTransition)
          .reduce((elem1, elem2) => elem1 && elem1.concat(elem2));

      if (select.target.checked) {
        this.setState(
          {
            checkAll: true,
            selectItems: lstlistTransition,
          },
          () => {
            console.log("selectItemsAll", this.state.checkAll);
          }
        );
      } else {
        this.setState(
          {
            checkAll: false,
            selectItems: [],
          },
          () => {
            console.log("selectItemsAll", this.state.checkAll);
          }
        );
      }
    }
  };
  deleteItem = (item) => {
    console.log("deleteItem", item);
  };
  editItem = (item) => {
    console.log("editItem", item);
  };

  onchangeSelect = (select, data) => {
    const { count, selectItems } = this.state;
    if (select.target.checked) {
      selectItems.push(data);
      this.setState(
        {
          count: count + 1,
          checkAll: false,
          selectItems,
        },
        () => {
          console.log("selectItems", this.state.selectItems);
        }
      );
    } else {
      selectItems.splice(selectItems.indexOf(data), 1);

      this.setState({
        count: count - 1,
        checkAll: false,
        selectItems,
      });
    }
  };

  renderItem() {
    const { checkAll, selectItems } = this.state;
    let result = "";
    let dataAgencyShow;
    let dataSearch = this.state.searchStr;
    if (dataSearch === "") {
      return dataAgencyShow === listTransition;
    } else {
      dataAgencyShow = listTransition.filter((item: any) => {
        let nameCheck = replaceTiengVietCoDau(item.name.toUpperCase());
        let dataSearchCheck = replaceTiengVietCoDau(
          dataSearch ? dataSearch.toUpperCase() : ""
        );

        let locationCheck = replaceTiengVietCoDau(item.name.toUpperCase());

        return (
          nameCheck.includes(dataSearchCheck) ||
          locationCheck.includes(dataSearchCheck)
        );
      });
      console.log("dataAgencyShow", dataAgencyShow);
    }
    if (dataAgencyShow && dataAgencyShow.length > 0) {
      result = dataAgencyShow.map((item, index) => {
        return (
          <div className="row itemlist" key={item.id}>
            <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-item">
              <UI.CheckBox
                checked={checkAll || selectItems.indexOf(item) !== -1}
                label=""
                value={item}
                onChange={(e) => this.onchangeSelect(e, item)}
              />
              {/* <UI.CheckBox
                className="check-all"
                onChange={this.onChangeSelectAll}
                checked={checkAll}
                label=""
              /> */}
            </div>

            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-item code">
              <Link
                to="#"
                onClick={() => {
                  this.props.dispatchShowPopup("detailtransaction", item);
                }}
              >
                {item.code}
              </Link>
            </div>

            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-item">
              <Link to={item.to}>{item.name}</Link>
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-item">
              {item.price}
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-item">
              {item.datetime}
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-item">
              <Link to="#" onClick={() => this.editItem(item)}>
                {" "}
                <Icon.Edit />
              </Link>
              <Link to="#" onClick={() => this.deleteItem(item)}>
                <Icon.Trash />
              </Link>
            </div>
          </div>
        );
      });
      return result;
    }
  }

  render() {
    const { checkAll } = this.state;
    return (
      <div className="transactions container-fluid">
        <div className="row top">
          <div className="actions action-btns">
            <UncontrolledDropdown className="data-list-dropdown mr-1">
              <DropdownToggle className="p-1" color="primary">
                <span className="align-middle mr-1">Actions</span>
                <ChevronDown size={15} />
              </DropdownToggle>
              <DropdownMenu tag="div" right>
                <DropdownItem tag="a">
                  <Icon.Trash />
                  Delete
                </DropdownItem>
                <DropdownItem tag="a">
                  <Icon.Archive />
                  Archive
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div className="action-search">
            <img
              src={IMAGES.icons_search}
              className="img-responsive"
              alt="icons search"
            />

            <input
              type="text"
              name="searchStr"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Tìm kiếm"
            />
          </div>
        </div>
        <div className="table-list">
          <div className="row title-table">
            <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-item">
              <UI.CheckBox
                className="check-all"
                onChange={this.onChangeSelectAll}
                checked={checkAll}
                label=""
              />
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-item">
               Code
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-item">
              Name
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-item">
              Price
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-item">
              Datetime
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-item">
              Actions
            </div>
          </div>
          {this.renderItem()}
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1" className="pagination">
              <Pagination className="d-flex justify-content-center mt-3">
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">6</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">7</PaginationLink>
                </PaginationItem>
              </Pagination>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  dispatchShowPopup: (popupType, item) => showPopup(popupType, item),
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
