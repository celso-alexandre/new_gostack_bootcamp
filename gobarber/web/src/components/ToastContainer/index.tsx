import React from 'react';
import { useTransition } from 'react-spring';
import { FiAlertCircle } from 'react-icons/fi';

import Toast from './Toast';

import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: {
        right: '-120%',
        opacity: 0,
        transform: 'rotateX(0deg) rotateY(0deg)',
      },
      enter: {
        right: '0%',
        opacity: 1,
        transform: 'rotateX(360deg) rotateY(360deg)',
      },
      leave: {
        right: '-120%',
        opacity: 0,
        transform: 'rotateX(0deg) rotateY(0deg)',
      },
    }
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item}>
          <FiAlertCircle size={20} />
        </Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;
