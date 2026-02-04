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
  padding: 20px;
  box-sizing: border-box;

  ${({ $isOpen }) => css`
    transform: translateX(${$isOpen ? '0' : '100%'});
    transition: transform 0.3s ease-in-out;
  `}
`;

export const CloseButton = styled.button`
  appearance: none;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  position: absolute;
  top: 14px;
  right: 14px;
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 22px rgba(16, 24, 40, 0.10);

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
  height: 100%;
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
