import styled from 'styled-components';
import { Paragraph } from 'theme/components/Typography';

export const Separator = styled(Paragraph).attrs({
  level: 2,
  fontWeight: 700,
  textAlign: 'center',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin: 12px 0px;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 50%;
    height: 1px;
    background: #374151;
  }
`;

export const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StarButton = styled.button`
  background: transparent;
  border: none;
  padding: 2px;
  display: inline-flex;
  cursor: pointer;
  transition: transform 0.12s ease;
  line-height: 1;

  &:focus-visible {
    outline: 2px solid #f9c646;
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const StarsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  margin: -8px auto 16px;
`;
