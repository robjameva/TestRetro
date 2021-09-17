import React from "react";
import styled from "@emotion/styled";
import { ReactComponent as Board } from "static/svg/board.svg";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import PasswordResetDialog from "./PasswordResetDialog";

const Container = styled.div`
  width: 80%;
  background: #fff;
  margin: 15vh auto;
  box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  background-attachment: scroll;
`;

const Title = styled.h1`
  display: flex;
  margin-top: 0;
  margin-bottom: 1.75rem;
  justify-content: center;
`;

const SigninContent = styled.div`
  padding-top: 5vh;
  padding-bottom: 5vh;
  display: flex;
`;

const SigninImage = styled.div`
  overflow: hidden;
  padding-left: 10vh;
  padding-top: 2vh;
`;

const LoginImg = styled.div`
  max-width: 100%;
  height: auto;
  text-align: center;
`;

const SigninForm = styled.div`
  width: 50%;
  padding-left: 20vh;
`;

const AditionalSpace = styled.div`
  margin-top: 10vh;
`;

const CenterContent = styled.div`
  padding-bottom: 5vh;
  justify-content: space-around;
  display: flex;
`;

const Auth = () => {
  return (
    <Container>
      <SigninContent>
        <SigninImage>
          <LoginImg>
            <Board width={200} height={200} />
          </LoginImg>
        </SigninImage>
        <SigninForm>
          <Title>Retro Gemini</Title>
          <LoginDialog />
        </SigninForm>
      </SigninContent>
      <AditionalSpace />
      <CenterContent>
        <RegisterDialog /> &nbsp; &nbsp; &nbsp; <PasswordResetDialog />
      </CenterContent>
    </Container>
  );
};

export default Auth;
