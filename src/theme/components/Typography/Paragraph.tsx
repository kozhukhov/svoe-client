import React from 'react';
import styled, { css } from 'styled-components';
import BaseLink from 'next/link';

import { TextAlign } from './types';

type ElementProps = {
  $marginBottom: string;
  $marginTop: string;
  $color: string;
  $textAlign: TextAlign;
  $noWrap: boolean;
  $level: 1 | 2 | 3 | 4 | 5;
  $maxWidth?: string;
  $fontWeight: 400 | 500 | 600 | 700;
};

const style = css<ElementProps>`
  ${({
    $maxWidth,
    $textAlign,
    $color,
    $marginTop,
    $marginBottom,
    $noWrap,
    $fontWeight,
  }) => css`
    max-width: ${$maxWidth};
    text-align: ${$textAlign};
    margin: ${$textAlign === 'center' ? 'auto' : '0'};
    color: ${$color};
    margin-top: ${$marginTop};
    margin-bottom: ${$marginBottom};
    white-space: ${$noWrap ? 'nowrap' : 'pre-line'};
    overflow: ${$noWrap ? 'hidden' : 'visible'};
    text-overflow: ${$noWrap ? 'ellipsis' : 'clip'};
    font-weight: ${$fontWeight};
  `}

  ${({ $level, theme: { media } }) => {
    switch ($level) {
      case 1:
        return css`
          font-size: 18px;
          line-height: 26px;

          ${media.mobile} {
            font-size: 16px;
            line-height: 24px;
          }
        `;
      case 2:
        return css`
          font-size: 16px;
          line-height: 24px;
        `;
      case 3:
        return css`
          font-size: 14px;
          line-height: 21px;
        `;
      case 4:
        return css`
          font-size: 12px;
          line-height: 16px;
        `;
      case 5:
        return css`
          font-size: 10px;
          line-height: 16px;
        `;
    }
  }}
`;

const Text = styled.div<ElementProps>`
  ${style}
`;

const TextLink = styled(BaseLink)<ElementProps>`
  ${style}

  display: block;
  cursor: pointer;
  transition: color 0.3s ease;
  width: fit-content;
  text-decoration: none;

  &:hover {
    color: rgba(21, 27, 45, 0.95);
  }
`;

type Props = {
  children: React.ReactNode;
  marginBottom?: string;
  marginTop?: string;
  color?: string;
  textAlign?: TextAlign;
  noWrap?: boolean;
  onClick?: () => void;
  level?: 1 | 2 | 3 | 4 | 5;
  maxWidth?: string;
  fontWeight?: 400 | 500 | 600 | 700;
  href?: string;
};

export const Paragraph: React.FC<Props> = ({
  children,
  marginBottom = '0px',
  marginTop = '0px',
  color = '#667085',
  textAlign = 'left',
  noWrap = false,
  level = 1,
  maxWidth,
  fontWeight = 400,
  href,
  ...props
}) => {
  const commonProps = {
    $color: color,
    $fontWeight: fontWeight,
    $level: level,
    $marginBottom: marginBottom,
    $marginTop: marginTop,
    $maxWidth: maxWidth,
    $noWrap: noWrap,
    $textAlign: textAlign,
    ...props,
  };

  if (href) {
    return (
      <TextLink href={href} {...commonProps}>
        {children}
      </TextLink>
    );
  }
  return <Text {...commonProps}>{children}</Text>;
};
