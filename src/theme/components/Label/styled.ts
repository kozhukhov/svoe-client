import styled, { css } from 'styled-components';

import { Variant } from '.';

export const Label = styled.div<{ $variant: Variant; $marginBottom: string }>`
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 14.52px;
  text-transform: uppercase;
  width: fit-content;
  padding: 4px 12px;

  ${({ $variant, $marginBottom }) => css`
    margin-bottom: ${$marginBottom};

    ${$variant === Variant.PRIMARY &&
    css`
      background: #3f8f4a;
      color: #fff;
    `}
  `}
`;
