import styled from 'styled-components';
import { CenteredRowFlex } from '../../typograhpy/flex';
import { ZIndex } from '../../consts/z-index';

export function Login() {
  return <LoginComponent>Login</LoginComponent>;
}

const LoginComponent = styled(CenteredRowFlex)`
  width: 300px;
  height: 300px;
  position: absolute;
  z-index: ${ZIndex.Login};
  top: 20px;
  left: 50%;
  background: white;
  border-radius: 15px;
  transform: translateX(-50%);
`;
