import styled, { keyframes } from 'styled-components';

const infiniteAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }

  50% {
    transform: translateX(-0%);
  }

  100% {
    transform: translateX(100%);
  }
`;

export const Bar = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: scaleX(0);
  transform-origin: left center;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.2s;
  background-color: #465fff;
  transform-origin: center center;
  animation: ${infiniteAnimation} 1s linear infinite;
`;

export const Wrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 2px;
  overflow: hidden;
`;
