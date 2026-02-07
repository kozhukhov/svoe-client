import styled, { css } from 'styled-components';
import { Skeleton } from 'theme/components/Skeleton';

export const StickyCategories = styled.div`
  position: relative;
  z-index: 1;
  padding: 6px 0 0;
  background: transparent;
`;

export const StickySentinel = styled.div`
  height: 1px;
  width: 100%;
`;

export const FixedCategories = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  z-index: 90;
  padding: 10px 0;

  background: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 14px 28px rgba(16, 24, 40, 0.1);

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0px' : '-8px')});
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition:
    opacity 180ms ease,
    transform 180ms ease;
`;

export const Categories = styled.div`
  display: flex;
  gap: 8px;
  margin: 0px -20px;
  padding: 0px 20px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryCardSekeleton = styled(Skeleton)`
  width: 100px;
  min-width: 100px;
  height: 39px;
`;

export const CategoryCard = styled.button<{ $active: boolean }>`
  appearance: none;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 0.82);
  box-sizing: border-box;
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  transition:
    transform 120ms ease,
    background 120ms ease,
    border-color 120ms ease;

  ${({ $active }) =>
    $active &&
    css`
      background: rgba(63, 143, 74, 0.12);
      border-color: rgba(63, 143, 74, 0.25);
    `}

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 2px solid rgba(63, 143, 74, 0.45);
    outline-offset: 2px;
  }
`;

export const CategorySection = styled.div`
  scroll-margin-top: 140px;
`;

export const ProductsTopSpacer = styled.div`
  height: 28px;
`;

export const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`;
