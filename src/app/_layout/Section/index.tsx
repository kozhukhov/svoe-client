'use client';

import React from 'react';
import styled, { css } from 'styled-components';

const StyledSection = styled.div<{ $withoutMarginBottom?: boolean }>`
  max-width: 1400px;
  margin: auto;

  padding-left: 60px;
  padding-right: 60px;

  ${({ theme: { media }, $withoutMarginBottom }) => css`
    margin-bottom: ${$withoutMarginBottom ? '0px' : '100px'};

    ${media.tablet} {
      padding-left: 20px;
      padding-right: 20px;
      margin-bottom: ${$withoutMarginBottom ? '0px' : '80px'};
    }

    ${media.mobile} {
      padding-left: 16px;
      padding-right: 16px;
      margin-bottom: ${$withoutMarginBottom ? '0px' : '60px'};
    }
  `}
`;

export const Section = ({
  children,
  withoutMarginBottom = false,
  id,
  ...props
}: {
  children: React.ReactNode;
  withoutMarginBottom?: boolean;
  id?: string;
}) => {
  return (
    <StyledSection
      $withoutMarginBottom={withoutMarginBottom}
      id={id}
      {...props}
    >
      {children}
    </StyledSection>
  );
};
