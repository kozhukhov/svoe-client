'use client';

import React from 'react';
import styled, { css } from 'styled-components';

const StyledMain = styled.main`
  max-width: 1400px;
  margin: auto;
  min-height: calc(100vh - 300px);

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      padding-bottom: 100px;
    }
  `}
`;

export const Main = ({ children }: { children: React.ReactNode }) => {
  return <StyledMain>{children}</StyledMain>;
};
