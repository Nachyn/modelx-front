import styled from 'styled-components';
import { ColumnFlex } from '../../typograhpy/flex';
import { ZIndex } from '../../consts/z-index';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PageRoutes } from '../../consts/routes';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { RegisterComponent } from '../Register/Register';
import * as userActions from '../../../store/user/actions';
import { LoginInfo } from '../../../store/user/models/login-info';

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values: LoginInfo) => {
    dispatch(userActions.login(values));
  };
  const register = () => {
    navigate(PageRoutes.register);
  };

  return (
    <LoginComponent>
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
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Buttons>
          <Button type="primary" htmlType="submit">
            Sign in
          </Button>
          <RegisterButton type="ghost" onClick={register}>
            Sign up
          </RegisterButton>
        </Buttons>
      </Form>
    </LoginComponent>
  );
}

const LoginComponent = styled(RegisterComponent)`
  z-index: ${ZIndex.Login};
`;

const RegisterButton = styled(Button)`
  margin-top: 10px;
`;

const Buttons = styled(ColumnFlex)``;
