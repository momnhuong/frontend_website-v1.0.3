import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { IMAGES } from "../../../assets";

const WrapperLogo = styled.div`
  height: 70px;
  background: transparent;
  margin: 0;
  text-align: center;
  overflow: hidden;
  border-radius: 0;

  img {
    max-height: 80%;
    width: auto;
  }
`;

const Logo = ({ collapsed = false }) => {
  return (
    <WrapperLogo className="logoWrapper">
      <img src={collapsed ? IMAGES.logo_menu : IMAGES.logo_menu} alt="logo" />
    </WrapperLogo>
  );
};

Logo.propTypes = {
  collapsed: PropTypes.bool,
};

export default React.memo(Logo);
