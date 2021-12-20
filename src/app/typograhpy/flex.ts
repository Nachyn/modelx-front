import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
`;

export const ColumnFlex = styled(Flex)`
  flex-direction: column;
`;

export const CenteredColumnFlex = styled(ColumnFlex)`
  justify-content: center;
  align-items: center;
`;

export const CenteredRowFlex = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

export const SpaceBetweenRowFlex = styled(Flex)`
  justify-content: space-between;
`;
