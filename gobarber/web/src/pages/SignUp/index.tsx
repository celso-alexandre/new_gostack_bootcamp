import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Name is mandatory'),
        email: Yup.string()
          .required('E-mail is mandatory')
          .email('Please type a valid e-mail'),
        password: Yup.string().min(6, 'Password is too short'),
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
    <>
      <Container>
        <Background />
        <Content>
          <img src={logoImg} alt="logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Registration</h1>

            <Input icon={FiUser} name="name" placeholder="Name" />
            <Input icon={FiMail} name="email" placeholder="E-mail" />
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
