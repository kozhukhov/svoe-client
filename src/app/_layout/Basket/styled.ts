import { css, styled } from 'styled-components';

export const BasketContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  background-color: #fff;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  height: 100vh;
  width: 40vw;
  padding: 20px;
  box-sizing: border-box;

  ${({ $isOpen }) => css`
    transform: translateX(${$isOpen ? '0' : '100%'});
    transition: transform 0.3s ease-in-out;
  `}
`;

export const BasketOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const BasketEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const BasketItem = styled.div``;

export const BasketImage = styled.img`
  width: 60px;
  height: 60px;
`;
