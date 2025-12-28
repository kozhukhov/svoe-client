import styled from 'styled-components';

import { Section } from '../Section';

export const Wrapper = styled(Section).attrs({
  withoutMarginBottom: true,
})`
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  display: flex;
  box-sizing: border-box;
`;

export const Dialog = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  width: 400px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

export const Application = styled.div`
  overflow: hidden;
`;
