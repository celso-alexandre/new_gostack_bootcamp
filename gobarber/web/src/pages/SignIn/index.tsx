import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail is mandatory')
          .email('Please type a valid e-mail'),
        password: Yup.string().required('Password is mandatory'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="logo" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Login</h1>

          <Input icon={FiMail} name="email" placeholder="E-mail" />
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
        </Form>

        <a href="c">
          <FiLogIn />
          Create a new account
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
