import React from 'react';
import styled, { css } from 'styled-components';

import { TextAlign } from './types';

type HeadlineLevel = 1 | 2 | 3 | 4 | 5;

type TagProps = {
  $marginBottom: string;
  $marginTop: string;
  $color?: string;
  $textAlign?: TextAlign;
  $level: HeadlineLevel;
  $maxWidth?: string;
  $fontWeight?: 400 | 500 | 600 | 700;
};

const style = css<TagProps>`
  ${({
    $textAlign,
    $color,
    $marginTop,
    $marginBottom,
    $fontWeight,
    $maxWidth,
  }) => css`
    text-align: ${$textAlign};
    margin: ${$textAlign === 'center' ? 'auto' : '0'};
    color: ${$color};
    margin-top: ${$marginTop};
    margin-bottom: ${$marginBottom};
    font-weight: ${$fontWeight};
    max-width: ${$maxWidth};
  `}

  ${({ $level, theme: { media } }) => {
    switch ($level) {
      case 1:
        return css`
          font-size: 46px;
          line-height: 55.2px;

          ${media.mobile} {
            font-size: 38px;
            line-height: 44px;
          }
        `;
      case 2:
        return css`
          font-size: 42px;
          line-height: 50px;

          ${media.mobile} {
            font-size: 36px;
            line-height: 42px;
          }
        `;
      case 3:
        return css`
          font-size: 36px;
          line-height: 42px;
          letter-spacing: -0.32px;

          ${media.mobile} {
            font-size: 32px;
            line-height: 38px;
          }
        `;
      case 4:
        return css`
          font-size: 28px;
          line-height: 36px;
          letter-spacing: -0.32px;

          ${media.mobile} {
            font-size: 24px;
            line-height: 32px;
          }
        `;
      case 5:
        return css`
          font-size: 21px;
          line-height: 27px;
        `;
    }
  }}
`;

export const H1 = styled.h1<TagProps>`
  ${style}
`;
export const H2 = styled.h2<TagProps>`
  ${style}
`;
export const H3 = styled.h3<TagProps>`
  ${style}
`;
export const H4 = styled.h4<TagProps>`
  ${style}
`;
export const H5 = styled.h5<TagProps>`
  ${style}
`;

type Props = {
  children: React.ReactNode;
  marginBottom?: string;
  marginTop?: string;
  color?: string;
  textAlign?: TextAlign;
  onClick?: () => void;
  level?: HeadlineLevel;
  fontWeight?: 400 | 500 | 600 | 700;
  maxWidth?: string;
};

export const Headline: React.FC<Props> = ({
  children,
  marginBottom = '0px',
  marginTop = '0px',
  color = '#1D2939',
  textAlign = 'left',
  level = 1,
  fontWeight = 700,
  maxWidth = '100%',
  ...props
}) => {
  const commonProps = {
    $color: color,
    $level: level,
    $marginBottom: marginBottom,
    $marginTop: marginTop,
    $textAlign: textAlign,
    $fontWeight: fontWeight,
    $maxWidth: maxWidth,
    ...props,
  };

  const HeadlineComponent = [H1, H2, H3, H4, H5][level - 1];

  return <HeadlineComponent {...commonProps}>{children}</HeadlineComponent>;
};
