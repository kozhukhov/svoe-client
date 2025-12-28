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
