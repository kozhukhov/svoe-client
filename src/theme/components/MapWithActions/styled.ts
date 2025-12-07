import styled, { css } from 'styled-components';

import { Paragraph } from '../Typography';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.04);
  background: #f8fafc;
`;

export const Frame = styled.iframe`
  width: 100%;
  min-height: 360px;
  flex: 1;
  border: none;

  ${({ theme: { media } }) => css`
    ${media.mobile} {
      min-height: 320px;
    }
  `}
`;

export const Action = styled(Paragraph).attrs({
  level: 2,
  fontWeight: 700,
})`
  background: rgba(249, 198, 70, 0.08);
  padding: 12px 14px;
  text-align: center;
  width: 100%;
`;
