import { Button, Form, Input } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { hidePopup, offLoading } from "../../../../../app/services";
import { IMAGES } from "../../../../../assets";
import LoadingBox from "../../../../../components/LoadingBox";
import { checkVNPhone } from "../../../../../utils/validate";
import { getprofile, updateProfile } from "../services";
import "./myprofile.css";

class MyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userProfile: {},
      isLoading: true,
    };
  }
  onFinish = (values) => {
    console.log("onHandleSubmit", values);
    this.props.dispatchUpdateProfile(values).then((res) => {
      console.log("onHandleSubmit!", res);
      if (res.status === 201) {
        this.props.dispatchGetProfile();
      }
    });
  };
  _fileChangedHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    // FileList object.
    var files = e.target.files;

    var file = files[0];

    var fileReader = new FileReader();

    fileReader.onload = (progressEvent) => {
      var url = fileReader.result;

      // Something like: data:image/png;base64,iVBORw...Ym57Ad6m6uHj96js
      this.onSetState(url);

      var myImg = document.getElementById("myimage");
      myImg.src = url ? url : IMAGES.avatar;
    };

    // Read file asynchronously.
    fileReader.readAsDataURL(file); // fileReader.result -> URL.
  };
  onSetState = (data: any) => {
    this.setState({ logo: data });
  };
  componentDidMount() {
    this.props.dispatchHidePopup();
    this.props.dispatchoffLoading();
    this.props
      .dispatchGetProfile()
      .then((res) => {
        if (res && res.data) {
          this.setState({
            userProfile: res.data,
            isLoading: false,
          });
        }
      })
      .catch((message_code) => {
        console.log("dispatchGetDetailProduct error: ", message_code);
      });
    console.log("infoProfile", this.props.infoProfile);
    if (this.props.infoProfile && this.props.infoProfile.data) {
      this.setState({
        infoProfile: this.props.infoProfile.data,
        isLoading: false,
      });
    }
  }
  renderUI() {
    let { infoProfile } = this.props;
    let { isLoading } = this.state;
    let item = infoProfile.data;

    if (isLoading) {
      return <LoadingBox />;
    } else {
      return (
        <div className="myprofile">
          <div className="content_profile">
            <div className="content_profile">
              <div className="chage_avatar">
                <div className="avatar">
                  <input
                    name="logo"
                    id="logo"
                    type="file"
                    style={{ display: "none" }}
                    ref={(ref) => (this.myInput = ref)}
                    onChange={this._fileChangedHandler}
                  />
                  <div className="media-photo media-round" aria-hidden="true">
                    <img
                      id="myimage"
                      src={IMAGES.avatar}
                      width="210px"
                      alt="logo product"
                    />
                  </div>
                </div>
                <div className="content_avatar">
                  {/* <ul className="gr_btn">
          <li>
            <button
              type="button"
              className="btn btn-default"
              onClick={(e) => this.myInput.click()}
            >
              Upload new photo
            </button>
          </li>
          <li>
            <button type="button" className="btn btn-link">
              Reset
            </button>
          </li>
        </ul>
        <p>Allowed JPG, GIF or PNG. Max size of 800kB</p> */}
                  <div className="contentent">
                    <span>
                      {this.props.infoProfile && this.props.infoProfile.data
                        ? this.props.infoProfile.data.fullname
                        : ""}
                    </span>
                    <p>{item ? item.email : ""}</p>
                  </div>
                </div>
              </div>

              <div className="myprofileForm">
                <Form
                  className="form-edit-customer"
                  layout="vertical"
                  size="large"
                  initialValues={{
                    fullname:
                      this.props.infoProfile && this.props.infoProfile.data
                        ? this.props.infoProfile.data.fullname
                        : "",
                    email:
                      this.props.infoProfile && this.props.infoProfile.data
                        ? this.props.infoProfile.data.email
                        : "",
                    identity_card:
                      this.props.infoProfile && this.props.infoProfile.data
                        ? this.props.infoProfile.data.identity_card
                        : "",
                    phone:
                      this.props.infoProfile && this.props.infoProfile.data
                        ? this.props.infoProfile.data.phone
                        : "",
                    mobile:
                      this.props.infoProfile && this.props.infoProfile.data
                        ? this.props.infoProfile.data.mobile
                        : "",
                    fax:
                      this.props.infoProfile && this.props.infoProfile.data
                        ? this.props.infoProfile.data.fax
                        : "",
                    address:
                      this.props.infoProfile && this.props.infoProfile.data
                        ? this.props.infoProfile.data.address
                        : "",
                  }}
                  onFinish={this.onFinish}
                >
                  <Form.Item
                    label="Fullname:"
                    name="fullname"
                    rules={[
                      {
                        required: true,
                        message: "Trường này không được để trống",
                      },
                    ]}
                  >
                    <Input
                      autoComplete="off"
                      placeholder="Fullname"
                      type="text"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Email:"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Trường này không được để trống",
                      },
                    ]}
                  >
                    <Input autoComplete="off" placeholder="Email" type="text" />
                  </Form.Item>
                  <Form.Item
                    label="Identity Card:"
                    name="identity_card"
                    rules={[
                      {
                        required: true,
                        message: "Trường này không được để trống",
                      },
                    ]}
                  >
                    <Input
                      autoComplete="off"
                      placeholder="Tài khoản chính"
                      type="text"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Phone number:"
                    name="phone"
                    rules={[{ validator: checkVNPhone }]}
                  >
                    <Input
                      autoComplete="off"
                      placeholder="Phone number"
                      type="text"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Mobile Phone:"
                    name="mobile"
                    rules={[{ validator: checkVNPhone }]}
                  >
                    <Input
                      autoComplete="off"
                      placeholder="Mobile Phone"
                      type="text"
                    />
                  </Form.Item>
                  <Form.Item label="Fax:" name="fax">
                    <Input autoComplete="off" placeholder="Fax" type="text" />
                  </Form.Item>
                  <Form.Item label="Address:" name="address">
                    <Input
                      autoComplete="off"
                      placeholder="address"
                      type="text"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button block htmlType="submit" className="btn-submit">
                      <span>Update</span>
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return this.renderUI();
  }
}

const mapStateToProps = (state) => ({
  infoProfile: state.getProfile.dataSuccess,
});

const mapDispatchToProps = {
  dispatchHidePopup: () => hidePopup(),
  dispatchGetProfile: () => getprofile(),
  dispatchUpdateProfile: (data) => updateProfile(data),
  dispatchoffLoading: () => offLoading(),
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
