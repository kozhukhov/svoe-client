import styled, { css } from 'styled-components';

import { Color, Size, Variant } from './types';

type Props = {
  $marginBottom: string;
  $marginTop: string;
  $variant: Variant;
  $fullWidth: boolean;
  $iconOnly: boolean;
  $size: Size;
  $color: Color;
};

const baseButtonStyle = css<Props>`
  font-weight: 600;
  line-height: 16px;
  border-radius: 12px;

  ${({ $marginBottom, $marginTop, $fullWidth, $iconOnly, $size }) => css`
    padding: ${$iconOnly ? '0px' : '11px 22px'};
    margin-bottom: ${$marginBottom};
    margin-top: ${$marginTop};

    ${$size === Size.SMALL &&
    css`
      height: 32px;
      font-size: 12px;
      width: ${$fullWidth ? '100%' : $iconOnly ? '32px' : 'max-content'};
    `}

    ${$size === Size.LARGE &&
    css`
      height: 50px;
      font-size: 16px;
      width: ${$fullWidth ? '100%' : $iconOnly ? '50px' : 'max-content'};
    `}

    ${$size === Size.MEDIUM &&
    css`
      height: 40px;
      font-size: 14px;
      width: ${$fullWidth ? '100%' : $iconOnly ? '40px' : 'max-content'};
    `}
  `}

  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.1s ease-in-out;
  gap: 8px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const primaryButtonStyle = css<Props>`
  color: #ffffff;
  border: none;

  background: #465fff;

  &:not(:disabled):hover {
    background: rgb(55, 76, 217);
  }

  &:not(:disabled):active {
    background: rgb(38, 57, 181);
  }
`;

const secondaryButtonStyle = css<Props>`
  color: #1d2939;
  border: 1px solid #1d2939;

  background: #ffffff;

  &:not(:disabled):hover {
    background: #f5f5f5;
  }

  &:not(:disabled):active {
    background: #e5e5ea;
  }

  ${({ $color }) =>
    $color === Color.DANGER &&
    css`
      border-color: #ff3b30;
      color: #ff3b30;
    `}
`;

const getButtonStyle = (variant: Variant) => {
  switch (variant) {
    case Variant.PRIMARY:
      return primaryButtonStyle;
    case Variant.SECONDARY:
      return secondaryButtonStyle;
  }
};

export const Button = styled.button<Props>`
  ${baseButtonStyle};
  ${({ $variant }) => getButtonStyle($variant)}
`;
