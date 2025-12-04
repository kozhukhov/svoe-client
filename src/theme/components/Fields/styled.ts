import { css } from 'styled-components';

export const baseFieldStyles = css<{
  $hasError: boolean;
  $hasWarning: boolean;
}>`
  width: 100%;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  border-radius: 12px;
  outline: none;
  height: 48px;
  color: #1d2939;
  border: 1px solid
    ${({ $hasError }) => ($hasError ? '#FF3B30' : 'rgb(228, 231, 236)')};
  padding: 16px;
  caret-color: #1d2939;
  box-sizing: border-box;
  background-color: #ffffff;

  &::placeholder {
    color: #abafb1;
    font-weight: 400;
  }

  &:hover {
    background-color: #f5f5f5;
  }

  &:focus {
    background-color: #ffffff;
    border-color: ${({ $hasError }) => ($hasError ? '#FF3B30' : '#465fff')};
  }

  &:disabled {
    background-color: #f5f5f5;
    border-color: ${({ $hasError }) => ($hasError ? '#FF3B30' : '#E5E5EA')};
    cursor: not-allowed;
  }

  ${({ $hasWarning, $hasError }) =>
    $hasWarning &&
    !$hasError &&
    css`
      border-color: #ff9500 !important;
    `}
`;

export const wrapperStyles = css`
  display: block;
  position: relative;
  width: 100%;
  margin-bottom: 16px;
`;

export const customNodeWrapperStyles = css`
  position: absolute;
  right: 14px;
  top: 38px;
`;
