import React, { useState } from 'react';
import { Paragraph } from 'theme/components/Typography';

import { TextFieldProps } from '../types';

import * as Styled from './styled';

interface SelectFieldProps extends Omit<TextFieldProps, 'type'> {
  options: Array<{ value: string; label: string }>;
}

export const FormSelectField = ({
  registration,
  label,
  error,
  placeholder,
  disabled,
  options,
  required,
  warning,
}: SelectFieldProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    registration.onChange(e);
    setIsSelected(true);
  };

  return (
    <Styled.Wrapper>
      {label && (
        <Paragraph color="#1a1a1a" level={3} marginBottom="2px">
          {label}
          {required && <span style={{ color: '#ff3b30' }}>*</span>}
        </Paragraph>
      )}
      <Styled.Select
        $hasError={!!error}
        $isSelected={isSelected}
        disabled={disabled}
        {...registration}
        $hasWarning={!!warning}
        defaultValue=""
        onChange={onChange}
      >
        <option disabled defaultValue="" value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Styled.Select>
      {error && (
        <Paragraph color="#ff3b30" level={4} marginTop="2px">
          {error}
        </Paragraph>
      )}
    </Styled.Wrapper>
  );
};
