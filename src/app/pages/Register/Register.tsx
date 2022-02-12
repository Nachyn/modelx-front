import React from 'react';
import styled from 'styled-components';
import { CenteredRowFlex, ColumnFlex } from '../../typograhpy/flex';
import { ZIndex } from '../../consts/z-index';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { RegisterInfo } from '../../../store/user/models/register-info';
import * as userActions from '../../../store/user/actions';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../consts/routes';

export function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values: RegisterInfo) => {
    dispatch(userActions.register(values));
  };
  const goToLogin = () => {
    navigate(PageRoutes.login);
  };

  return (
    <RegisterComponent>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Buttons>
          <Button type="primary" htmlType="submit">
            Register now
          </Button>
          <LoginButton type="ghost" onClick={goToLogin}>
            Back to login
          </LoginButton>
        </Buttons>
      </Form>
    </RegisterComponent>
  );
}

export const RegisterComponent = styled(CenteredRowFlex)`
  padding: 10px;
  position: absolute;
  z-index: ${ZIndex.Register};
  top: 50%;
  left: 50%;
  background: white;
  transform: translateX(-50%) translateY(-50%);

  border-radius: 2px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
`;

const LoginButton = styled(Button)`
  margin-top: 10px;
`;

const Buttons = styled(ColumnFlex)``;
