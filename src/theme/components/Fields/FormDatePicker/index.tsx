import type { MutableRefObject } from 'react';
import { useCallback, useRef } from 'react';
import { Paragraph } from 'theme/components/Typography';

import { DatePickerFieldProps } from '../types';

import * as Styled from './styled';

export const FormDatePicker = ({
  registration,
  label,
  error,
  placeholder,
  disabled,
  required,
  min,
  max,
  step = 60,
  warning,
  ...props
}: DatePickerFieldProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...registrationWithoutRef } = registration;

  const setRefs = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as MutableRefObject<HTMLInputElement | null>).current = node;
      }
    },
    [ref],
  );

  const handleTriggerClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }

    if (typeof inputRef.current.showPicker === 'function') {
      inputRef.current.showPicker();
    } else {
      inputRef.current.focus();
      inputRef.current.click();
    }
  }, []);

  const placeholderText = placeholder ?? 'ДД.ММ.ГГГГ, --:--';

  return (
    <Styled.Wrapper {...props}>
      {label && (
        <Paragraph color="#1a1a1a" level={3} marginBottom="2px">
          {label}
          {required && <span style={{ color: '#ff3b30' }}>*</span>}
        </Paragraph>
      )}
      <Styled.Input
        $hasError={!!error}
        $hasWarning={!!warning}
        disabled={disabled}
        max={max}
        min={min}
        placeholder={placeholderText}
        step={step}
        type="datetime-local"
        {...registrationWithoutRef}
        ref={setRefs}
      />
      <Styled.Trigger type="button" onClick={handleTriggerClick}>
        <Styled.TriggerIcon aria-hidden="true" />
        <Styled.TriggerText>Выбрать дату</Styled.TriggerText>
      </Styled.Trigger>
      {error && (
        <Paragraph color="#ff3b30" level={4} marginTop="2px">
          {error}
        </Paragraph>
      )}
      {warning && !error && (
        <Paragraph color="#ff9500" level={4} marginTop="2px">
          {warning}
        </Paragraph>
      )}
    </Styled.Wrapper>
  );
};
