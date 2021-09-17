import React from "react";
import { Switch, Route, RouteProps } from "react-router-dom";
import styled from "@emotion/styled";

import Board from "features/board";
import BoardList from "features/board/BoardList";
import Navbar from "features/navbar/Navbar";
import BoardBar from "features/board/BoardBar";
import Profile from "features/profile/Profile";
import PageError from "components/PageError";
import { barHeight } from "const";
import { useTheme, WithTheme } from "@material-ui/core";

const Main = styled.div<WithTheme>`
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-top: ${barHeight - 40}px;
  }
`;

const Wrapper: React.FC = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Navbar />
      <Main theme={theme}>{children}</Main>
    </>
  );
};

const AppRoute = (props: RouteProps) => (
  <Route {...props}>
    <Wrapper>{props.children}</Wrapper>
  </Route>
);

const AuthenticatedApp = () => {
  return (
    <Switch>
      <AppRoute exact path="/profile">
        <Profile />
      </AppRoute>
      <AppRoute exact path="/b/:id">
        <BoardBar />
        <Board />
      </AppRoute>

      <AppRoute exact path="/">
        <BoardList />
      </AppRoute>
      <Route path="*">
        <PageError>Page not found.</PageError>
      </Route>
    </Switch>
  );
};

export default AuthenticatedApp;
