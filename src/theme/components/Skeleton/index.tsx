import React, { FC } from 'react';

import * as Styled from './styled';

type Props = {
  width?: string;
  height?: string;
  marginBottom?: string;
};

export const Skeleton: FC<Props> = ({
  width = '100%',
  height = 'auto',
  marginBottom = '0px',
}) => (
  <Styled.Skeleton
    $height={height}
    $marginBottom={marginBottom}
    $width={width}
  />
);
