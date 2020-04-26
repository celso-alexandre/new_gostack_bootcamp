import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => (
  <>
    <Container>
      <Content>
        <img src={logoImg} alt="logo" />

        <form>
          <h1>Login</h1>

          <Input icon={FiMail} name="email" type="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button name="submit" type="submit">
            Log-In
          </Button>

          <a href="forgot">Forgot my password</a>
        </form>

        <a href="c">
          <FiLogIn />
          Create a new account
        </a>
      </Content>
      <Background />
    </Container>
  </>
);

export default SignIn;
