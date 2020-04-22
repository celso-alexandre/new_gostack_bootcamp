import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositories on Github</Title>

      <Form action="">
        <input placeholder="Type in repository name" />
        <button type="submit">Search</button>
      </Form>

      <Repositories>
        <a href="#">
          <img
            src="https://avatars0.githubusercontent.com/u/37484505?s=460&u=9426408625249cf4fb22ff599e53b5ff15eb09c0&v=4"
            alt="Celso Alexandre"
          />
          <div>
            <strong>celso-alexandre/semana_omnistack_11</strong>
            <p>Semana Omnistack da RocketSeat Edicao 11 (2020)</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="#">
          <img
            src="https://avatars0.githubusercontent.com/u/37484505?s=460&u=9426408625249cf4fb22ff599e53b5ff15eb09c0&v=4"
            alt="Celso Alexandre"
          />
          <div>
            <strong>celso-alexandre/semana_omnistack_11</strong>
            <p>Semana Omnistack da RocketSeat Edicao 11 (2020)</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="#">
          <img
            src="https://avatars0.githubusercontent.com/u/37484505?s=460&u=9426408625249cf4fb22ff599e53b5ff15eb09c0&v=4"
            alt="Celso Alexandre"
          />
          <div>
            <strong>celso-alexandre/semana_omnistack_11</strong>
            <p>Semana Omnistack da RocketSeat Edicao 11 (2020)</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
