import styled from 'styled-components';

import { baseFieldStyles, wrapperStyles } from '../styled';

export const Input = styled.input<{
  $hasError: boolean;
  $hasWarning: boolean;
}>`
  ${baseFieldStyles}
  appearance: none;
  padding-right: 110px;

  &::-webkit-calendar-picker-indicator {
    display: none;
  }
`;

export const Wrapper = styled.div`
  ${wrapperStyles}
`;

export const Trigger = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #eef2ff;
  border-radius: 8px;
  padding: 3px 10px;
  color: #4b5565;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  top: 47px;
  padding: 5px 10px;

  &:hover {
    background-color: #d9e2ff;
  }

  &:focus-visible {
    outline: 2px solid #465fff;
    outline-offset: 2px;
  }
`;

export const TriggerIcon = styled.span`
  width: 12px;
  height: 12px;
  border: 2px solid #4b5565;
  border-radius: 6px;
  position: relative;
  display: inline-block;

  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: 1px;
    right: 1px;
    height: 5px;
    border-radius: 4px 4px 0 0;
    background-color: #4b5565;
  }

  &::after {
    content: '';
    position: absolute;
    top: 7px;
    left: 3px;
    right: 3px;
    bottom: 4px;
    border-radius: 2px;
    background-color: #eef2ff;
  }
`;

export const TriggerText = styled.span`
  white-space: nowrap;
  color: #4b5565;
`;
