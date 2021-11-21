import styled from "styled-components";
import theme from "../../../assets/themes";

const Header = styled.div`
  padding: 0 1rem;
  position: fixed;
  height: 63px;
  overflow: hidden;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  /* background: linear-gradient(90deg, #70a9ff, #1b47ce); */
  background: #fff;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
  .menu {
    margin: 0 15px;
  }
  .menu-right {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        span {
          color: #4d4d4d;
        }
      }
      a.active {
        span {
          color: white;
        }
      }
    }
  }
  .logoWrapper {
    display: flex;
    height: 50px;
  }
  .custom-menu {
    .item-menu {
      /* line-height: 40px; */
      color: ${theme.palette.color[1]};

      a {
        height: 40px;
        display: flex;
        align-items: center;
        /* .item-icon {
          padding: 0;
          padding-left: 17.5px;
        } */
        /* span {
          padding: 10.5px 17.5px;
          padding-left: 0;
        } */
      }
      a.active {
        span {
          padding-right: 0;
        }
      }
      &:hover {
        border-bottom: transparent;
        color: white;
        background: #0bcbff;
        box-shadow: 0 0 6px 1px rgba(115, 103, 240, 0.6);
        border-radius: 4px;
      }
    }
    &:hover {
      a {
        color: white;
      }
    }
    .item-menu.ant-menu-item-selected {
      background: #0bcbff;
      box-shadow: 0 0 6px 1px rgba(115, 103, 240, 0.6);
      color: #ffffff;
      border-bottom: none;
      border-radius: 4px;
      a {
        color: white;
      }
    }
  }
  .custom-menu.menu-right {
    justify-content: flex-start;
    .support {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      a {
        line-height: unset;
        margin-top: 6px;
      }
      .hot-line {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-right: 10px;
        .img-avatar {
          margin-right: 5px;
          svg {
            font-size: 1.4rem;
          }
        }
        .right-hotline {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          flex-direction: column;
          margin-right: 5px;
          span {
            line-height: 1.1rem;
            font-size: 1rem;
          }
          .title-number-hotline {
            font-weight: bold;
            color: #626262;
          }
        }
      }
      .info-account {
        margin: 0;
        padding-right: 0.5rem;
        display: flex;
        align-items: center;
        .ant-dropdown-link {
          line-height: unset;
          display: flex;
          align-items: center;
        }
        .right-info-account {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          flex-direction: column;
          margin-right: 5px;
          span {
            line-height: 20px;
          }
          .name-account {
            font-weight: bold;
            font-size: 1rem;
          }
        }

        img {
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12),
            0 2px 4px 0 rgba(0, 0, 0, 0.08);
        }
      }
      svg {
        margin-right: 10px;
        font-size: 1.6rem;
        color: #626262;
      }
      .avatar:hover,
      .avatar:active {
        border-bottom: 2px solid transparent;
      }
      .btn-logout {
        margin-left: 5px;
        display: flex;
        align-items: center;
        svg {
          font-size: 2.5rem;
        }
      }
      .ant-badge {
        position: relative;
        .ant-badge-count {
          right: unset;
          left: 0;
          background-color: #0071bc;
          span {
            p.current {
              color: white;
            }
          }
        }
        .ant-badge-count.ant-badge-multiple-words {
          padding: unset;
        }
      }
    }
    &:hover {
      .support {
        .hot-line {
          .right-hotline {
            .number-hotline {
              a {
                color: #0bcbff;
              }
            }
          }
        }
      }
    }
  }
  .ant-menu-horizontal {
    line-height: unset;
    background-color: transparent;
    border-bottom: none;
  }
  .ant-menu-horizontal {
    .isoDashboardMenu {
      /* padding-top: 35px;
      padding-bottom: 35px;
      background: transparent; */

      .ant-menu-item.item-menu {
        width: 100%;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        padding: 0 24px;
        margin: 0;
        color: white;
      }
    }
  }
`;

export { Header };
