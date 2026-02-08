import { css, styled } from 'styled-components';
import { Paragraph } from 'theme/components/Typography';

export const BasketContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  background-color: #fff;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  height: 100vh;
  width: 40vw;
  min-width: 400px;
  padding: 20px;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  ${({ theme: { media } }) => css`
    ${media.tablet} {
      width: 100vw;
      min-width: unset;
      padding-bottom: calc(32px + env(safe-area-inset-bottom));
    }
  `}

  ${({ $isOpen }) => css`
    transform: translateX(${$isOpen ? '0' : '100%'});
    transition: transform 0.3s ease-in-out;
  `}
`;

export const BasketHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
`;

export const CloseButton = styled.button`
  appearance: none;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.9);
  color: #1d2939;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 1);
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 2px solid rgba(63, 143, 74, 0.45);
    outline-offset: 2px;
  }
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
  flex: 1;
`;

export const BasketItems = styled.div`
  flex: 1;
  overflow: auto;
  padding-right: 8px;
  overscroll-behavior: contain;
`;

export const BasketItem = styled.div<{ $compact?: boolean }>`
  display: flex;
  gap: 16px;
  border-bottom: 1px solid #e4e7ec;
  padding-bottom: 8px;
  margin-bottom: 8px;

  ${({ $compact }) =>
    $compact &&
    css`
      gap: 10px;
      padding-bottom: 6px;
      margin-bottom: 6px;

      > img {
        width: 72px;
        height: 72px;
      }
    `}
`;

export const BasketImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
  background: #f3f4f6;
`;

export const BottomBasket = styled.div`
  padding-top: 16px;
  margin-top: auto;
  border-top: 1px solid #e4e7ec;
`;

export const BasketItemDescription = styled(Paragraph).attrs({
  level: 3,
})`
  hyphens: auto;
`;

export const ActionButton = styled.div<{ $compact?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d4e9d4;
  border-radius: 14px;
  overflow: auto;
  height: 30px;
  overflow: hidden;
  width: 120px;

  > button {
    width: 30px;
    height: 30px;
    padding: 0;
    font-size: 18px;
    font-weight: 400;
    border-radius: 0px;
    margin-bottom: 2px;
  }

  ${({ $compact }) =>
    $compact &&
    css`
      height: 28px;
      width: 104px;
      border-radius: 12px;

      > button {
        width: 28px;
        height: 28px;
        font-size: 16px;
      }
    `}
`;

export const BasketItemContent = styled.div`
  flex: 1;
`;
