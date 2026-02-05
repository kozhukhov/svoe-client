import React, { FC } from 'react';

import * as Styled from './styled';

type Props = {
  width?: string;
  height?: string;
  marginBottom?: string;
  marginTop?: string;
  className?: string;
};

export const Skeleton: FC<Props> = ({
  width = '100%',
  height = 'auto',
  marginBottom = '0px',
  marginTop = '0px',
  className,
}) => (
  <Styled.Skeleton
    $height={height}
    $marginBottom={marginBottom}
    $marginTop={marginTop}
    $width={width}
    className={className}
  />
);
