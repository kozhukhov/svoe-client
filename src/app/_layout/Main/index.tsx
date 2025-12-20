'use client';

import React from 'react';
import styled from 'styled-components';

const StyledMain = styled.main`
  max-width: 1400px;
  margin: auto;
  min-height: calc(100vh - 300px);
`;

export const Main = ({ children }: { children: React.ReactNode }) => {
  return <StyledMain>{children}</StyledMain>;
};
