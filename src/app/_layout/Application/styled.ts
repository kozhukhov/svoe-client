import styled, { css } from 'styled-components';
import { Paragraph } from 'theme/components/Typography';

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

export const InactiveDialog = styled(Dialog)`
  width: 520px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${({ theme: { media } }) => css`
    ${media.mobile} {
      width: 100%;
    }
  `}
`;

export const InactiveDivider = styled.div`
  height: 1px;
  width: 100%;
  background: rgba(0, 0, 0, 0.08);
`;

export const InactiveLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

export const InactiveLink = styled(Paragraph)`
  &:hover {
    color: #3f8f4a;
  }
`;

export const InactiveSocials = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 12px;
`;

export const InactiveSocialLink = styled.a<{ $icon: string }>`
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: opacity 0.3s ease;
  opacity: 0.85;

  &:hover {
    opacity: 1;
  }

  ${({ $icon }) => css`
    background-image: url(${$icon});
  `}
`;

export const Application = styled.div`
  overflow-x: hidden;
`;
