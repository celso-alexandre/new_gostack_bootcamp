import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import { AnimationContainer, Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const location = useLocation();

  const queryParams = queryString.parse(location.search);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Password is mandatory'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match'
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;

        const { token } = queryParams;

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          token,
          password,
          password_confirmation,
        });

        history.push('/');

        addToast({
          type: 'success',
          title: 'Password resetted succesfully',
          description: 'Please login.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Error on Password Reset',
          description:
            'An error has ocurred while resetting your password, try again.',
        });
      }
    },
    [addToast, history, queryParams]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Password Reset</h1>

            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="New Password"
            />
            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Password confirmation"
            />
            <Button name="submit" type="submit">
              Reset Password
            </Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
