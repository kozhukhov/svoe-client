import { ToastType } from 'react-hot-toast';
import styled, { css, keyframes } from 'styled-components';

import ErrorIcon from './assets/error.svg';
import LoadingIcon from './assets/loading.svg';
import SuccessIcon from './assets/success.svg';

const loaderAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`;

export const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  z-index: 9999999999999;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ItemWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  max-width: 800px;
  margin: auto;
  transition: all 0.3s ease-out;
  background-color: rgb(13, 12, 34);
  border-radius: 12px;
  padding: 12px 16px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 12px;
  width: max-content;
`;

export const Icon = styled.div<{ $type: ToastType }>`
  min-width: 16px;
  height: 16px;
  background-size: contain;

  ${({ $type }) => {
    switch ($type) {
      case 'success':
        return css`
          background-image: url(${SuccessIcon.src});
        `;
      case 'error':
        return css`
          background-image: url(${ErrorIcon.src});
        `;
      case 'loading':
        return css`
          animation: ${loaderAnimation} 1200ms linear infinite;
          background-image: url(${LoadingIcon.src});
        `;
      default:
        return css``;
    }
  }}
`;
