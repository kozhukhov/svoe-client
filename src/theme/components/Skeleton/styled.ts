import styled, { css, keyframes } from 'styled-components';

type SkeletonProps = {
  $width: string;
  $height: string;
  $marginBottom: string;
  $marginTop: string;
};

const backgroundAnimation = keyframes`
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
`;

export const Skeleton = styled.div<SkeletonProps>`
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.06) 25%,
    rgba(0, 0, 0, 0.15) 37%,
    rgba(0, 0, 0, 0.06) 63%
  );
  background-size: 400% 100%;
  animation: ${backgroundAnimation} 1400ms ease infinite;
  border-radius: 16px;

  ${({ $width, $height, $marginBottom, $marginTop }) => css`
    width: ${$width};
    height: ${$height};
    margin-bottom: ${$marginBottom};
    margin-top: ${$marginTop};
  `}
`;
