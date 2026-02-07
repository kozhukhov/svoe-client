import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const BaseLoader = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: 3px solid #3f8f4a;
  border-top: 3px solid transparent;
  border-width: ${({ $size }) => $size / 10}px;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

type Props = {
  size?: number;
};

export const Loader: FC<Props> = ({ size = 24 }) => {
  return <BaseLoader $size={size} />;
};
