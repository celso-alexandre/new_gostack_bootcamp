import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import { AnimationContainer, Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
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

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Successfully registered!',
          description: 'You can now login into GoBarber',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Registering Error',
          description: 'An error has ocurred on registration, try again',
        });
      }
    },
    [addToast, history]
  );

  return (
    <>
      <Container>
        <Background />

        <Content>
          <AnimationContainer>
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

              <Link to="/">
                <FiArrowLeft />
                Go back and Log-In
              </Link>
            </Form>
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
};

export default SignUp;
