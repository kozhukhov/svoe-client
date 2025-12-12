'use client';

import styled, { css } from 'styled-components';

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
  margin-bottom: 18px;
`;

export const MapCard = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 420px) 1fr;
  gap: 20px;
  padding: 24px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      grid-template-columns: 1fr;
      padding: 18px;
    }
  `}
`;
