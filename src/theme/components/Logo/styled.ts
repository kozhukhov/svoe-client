import styled, { css } from 'styled-components';
import Link from 'next/link';

export const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

export const Wrapper = styled(Link)<{ $small: boolean }>`
  cursor: pointer;
  display: block;
  width: 77px;
  height: 62px;

  ${({ $small }) =>
    $small &&
    css`
      width: 54px;
      height: 43px;
    `}
`;
