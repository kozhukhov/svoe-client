import styled from 'styled-components';

import {
  baseFieldStyles,
  customNodeWrapperStyles,
  wrapperStyles,
} from '../styled';

export const Input = styled.input<{
  $hasError: boolean;
  $dark?: boolean;
  $hasWarning: boolean;
}>`
  ${baseFieldStyles}
`;

export const Textarea = styled.textarea<{
  $hasError: boolean;
  $dark?: boolean;
  $hasWarning: boolean;
}>`
  ${baseFieldStyles}
  height: auto;
  resize: none;
  margin-bottom: -6px;
`;

export const Wrapper = styled.div`
  ${wrapperStyles}
`;

export const CustomNodeWrapper = styled.div`
  ${customNodeWrapperStyles}
`;
