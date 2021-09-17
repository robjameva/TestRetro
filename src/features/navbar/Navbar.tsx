import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { barHeight } from "const";
import UserMenu from "./UserMenu";
import { NavLink, useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "static/svg/logo.svg";

const Container = styled.div`
  min-height: ${barHeight}px;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: #666eee;
  margin-top: 0;
`;

const TopArea = styled.div`
  display: flex;
  justify-content: center;
`;

const linkStyles = css`
  display: flex;
  justify-content: center;
  color: #caceed;
  padding: 0px 8px;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    color: #fff;
    cursor: pointer;
  }
  &.active {
    color: #fff;
  }
`;

const Item = styled.div`
  font-size: 1rem;
  color: #333;
  position: absolute;
  right: 20px;
`;

const MenuBlock = styled.div`
  padding-left: 20px;
`;

const Navbar = () => {
  const history = useHistory();

  return (
    <Container>
      <TopArea>
        <Logo
          css={css`
            &:hover {
              cursor: pointer;
            }
          `}
          onClick={() => history.push("/")}
        />
      </TopArea>
      <MenuBlock />
      <NavLink to="/" exact css={linkStyles}>
        Dashboard
      </NavLink>
      <NavLink to="/profile/" exact css={linkStyles}>
        Profile
      </NavLink>
      <Item css={linkStyles}>
        <UserMenu />
      </Item>
    </Container>
  );
};

export default Navbar;
