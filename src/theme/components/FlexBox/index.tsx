import React, { FC } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  children: React.ReactNode;
  gap?: string;
  align?: 'center' | 'baseline' | 'flex-start';
  justify?: 'space-between' | 'center';
  stretch?: boolean;
  direction?: 'column' | 'row';
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  marginBottom?: string;
  marginTop?: string;
};

const Wrapper = styled.div<{
  $gap: string;
  $align: string;
  $stretch: boolean;
  $justify: string;
  $direction: string;
  $marginBottom: string;
  $marginTop: string;
}>`
  display: flex;

  ${({
    $justify,
    $direction,
    $align,
    $marginBottom,
    $gap,
    $stretch,
    $marginTop,
  }) => css`
    justify-content: ${$justify};
    flex-direction: ${$direction};
    align-items: ${$align};
    gap: ${$gap};
    margin-bottom: ${$marginBottom};
    margin-top: ${$marginTop};

    ${$stretch &&
    css`
      > div {
        flex: 1 1 0px;
      }
    `};
  `};
`;

export const FlexBox: FC<Props> = ({
  children,
  gap = 's0',
  align = '',
  stretch = false,
  justify = '',
  direction = 'row',
  marginBottom = 's0',
  marginTop = 's0',
  ...props
}) => {
  return (
    <Wrapper
      $align={align}
      $direction={direction}
      $gap={gap}
      $justify={justify}
      $marginBottom={marginBottom}
      $marginTop={marginTop}
      $stretch={stretch}
      {...props}
    >
      {children}
    </Wrapper>
  );
};
