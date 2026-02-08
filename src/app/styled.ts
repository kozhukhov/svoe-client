import styled from 'styled-components';

import { Section } from './_layout/Section';

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
