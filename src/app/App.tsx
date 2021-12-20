import React from 'react';
import styled from 'styled-components';
import { Flex } from './typograhpy/flex';
import { media } from '../style/media-query';

function App() {
  return <Box />;
}

export default App;

const Box = styled(Flex)`
  width: 100px;
  height: 100px;
  background: blue;
  ${media.mobile`
    background: red;
  `}
`;
