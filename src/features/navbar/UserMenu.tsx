import React from "react";
import { Button, Menu, Avatar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { logout } from "features/auth/AuthSlice";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { avatarStyles } from "styles";
import { useHistory } from "react-router-dom";

const Username = styled.div`
  color: #333;
  text-align: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
  max-width: 250px;
  min-width: 100px;
  word-break: break-all;
  &:focus {
    outline: none;
  }
`;

const UserMenuStyle = styled.div`
  width: auto;
  box-sizing: border-box;
  min-height: auto;
  font-family: "Inter var", sans-serif;
  font-weight: 400;
  padding-top: 3px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  &:hover {
    cursor: pointer;
    color: rgb(102 110 238);
  }

  }
}
`;

const UserMenu = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    history.push("/");
  };

  const handleToProfile = () => {
    setAnchorEl(null);
    history.push("/profile");
  };

  return (
    <>
      <Button
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleClick}
        data-testid="user-menu"
        css={css`
          min-width: 2rem;
          padding: 10px 10px;
          border-radius: 50%;
          &:hover {
            background-color: initial;
          }
        `}
      >
        <Avatar
          css={avatarStyles}
          src={user?.photo_url || ""}
          alt="user-avatar"
        >
          {user?.username.charAt(0)}
        </Avatar>
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transitionDuration={0}
        css={css`
          padding-right: 0px;
          &:hover {
            color: initial;
          }
        `}
        keepMounted
      >
        <Username>{user?.username}</Username>
        <UserMenuStyle onClick={handleToProfile}>Profile</UserMenuStyle>
        <UserMenuStyle onClick={handleLogout}>Logout</UserMenuStyle>
      </Menu>
    </>
  );
};

export default UserMenu;
