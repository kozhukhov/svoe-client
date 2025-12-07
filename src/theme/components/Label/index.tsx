/* eslint-disable no-unused-vars */
import { FC } from 'react';

import * as Styled from './styled';

export enum Variant {
  PRIMARY = 'primary',
}

export const Label: FC<{
  text: string;
  variant: Variant;
  marginBottom?: string;
}> = ({ text, variant, marginBottom, ...props }) => {
  return (
    <Styled.Label
      $marginBottom={marginBottom || '0px'}
      $variant={variant}
      {...props}
    >
      {text}
    </Styled.Label>
  );
};
