import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <>
      <Container>
        <Background />
        <Content>
          <img src={logoImg} alt="logo" />

          <Form onSubmit={handleSubmit}>
            <h1>Registration</h1>

            <Input icon={FiUser} name="name" placeholder="Name" />
            <Input
              icon={FiMail}
              name="email"
              type="email"
              placeholder="E-mail"
            />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Password"
            />
            <Button name="submit" type="submit">
              Register
            </Button>
          </Form>

          <a href="/">
            <FiArrowLeft />
            Go back and Log-In
          </a>
        </Content>
      </Container>
    </>
  );
};

export default SignUp;
