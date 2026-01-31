import styled from 'styled-components';

import { Paragraph } from '../Typography';

export const Switcher = styled.div<{ $count: number; $activeIndex: number }>`
  --switcher-count: ${({ $count }) => $count};
  --switcher-index: ${({ $activeIndex }) => $activeIndex};

  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--switcher-count), minmax(0, 1fr));
  align-items: center;

  padding: 2px;
  border-radius: 999px;
  background: #e5e7eb;
  user-select: none;
  margin-bottom: 8px;

  &::before {
    content: '';
    position: absolute;
    top: 4px;
    bottom: 4px;
    left: 4px;
    width: calc((100% - 8px) / var(--switcher-count));
    border-radius: 999px;
    background: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
    transform: translateX(calc(var(--switcher-index) * 100%));
    transition:
      transform 200ms ease,
      box-shadow 200ms ease;
    will-change: transform;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      transition: none;
    }
  }
`;

export const SwitcherItem = styled.button<{ $active: boolean }>`
  appearance: none;
  border: 0;
  background: transparent;
  padding: 6px 12px;
  border-radius: 999px;
  cursor: pointer;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;

  &:focus-visible {
    outline: 2px solid rgba(59, 130, 246, 0.6);
    outline-offset: 2px;
  }
`;

export const SwitcherLabel = styled(Paragraph).attrs({
  fontWeight: 600,
  level: 4,
  textAlign: 'center',
  noWrap: true,
})``;
