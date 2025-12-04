import styled from 'styled-components';

import {
  baseFieldStyles,
  customNodeWrapperStyles,
  wrapperStyles,
} from '../styled';

export const Select = styled.select<{
  $hasError: boolean;
  $isSelected: boolean;
  $hasWarning: boolean;
}>`
  ${baseFieldStyles}
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23abafb1' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 12px 8px;
  padding-right: 40px;
  color: ${({ $isSelected }) => ($isSelected ? '#0c1116' : '#abafb1')};
`;

export const Wrapper = styled.div`
  ${wrapperStyles}
`;

export const CustomNodeWrapper = styled.div`
  ${customNodeWrapperStyles}
`;
