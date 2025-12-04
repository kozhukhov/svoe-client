import { useCallback, useEffect, useRef } from 'react';
import { useIMask } from 'react-imask';
import { Paragraph } from 'theme/components/Typography';

import { TextFieldProps } from '../types';

import * as Styled from './styled';

export const FormTextField = ({
  registration,
  label,
  error,
  type = 'text',
  placeholder,
  disabled,
  rightCustomNode,
  rows,
  required,
  mask,
  maskChar = '_',
  warning,
  ...props
}: TextFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { ref: maskRef } = useIMask(
    {
      mask: mask || '',
      placeholder: maskChar,
    },
    {
      onAccept: (value) => registration.onChange({ target: { value } }),
    },
  );

  useEffect(() => {
    if (mask && inputRef.current) {
      maskRef.current = inputRef.current;
    }
  }, [mask, maskRef]);

  const combinedRef = useCallback(
    (node: HTMLInputElement | null) => {
      if (inputRef) {
        inputRef.current = node;
      }
      if (typeof registration.ref === 'function') {
        registration.ref(node);
      } else if (registration.ref) {
        (registration.ref as any).current = node;
      }
    },
    [registration],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ref, ...registrationWithoutRef } = registration;

  const commonProps = {
    $hasError: !!error,
    $hasWarning: !!warning,
    disabled,
    placeholder,
    type,
    ...registrationWithoutRef,
  };

  return (
    <Styled.Wrapper {...props}>
      {label && (
        <Paragraph color="#1a1a1a" level={3} marginBottom="2px">
          {label}
          {required && <span style={{ color: '#ff3b30' }}>*</span>}
        </Paragraph>
      )}

      {rows ? (
        <Styled.Textarea rows={rows} {...commonProps} ref={registration.ref} />
      ) : mask ? (
        <Styled.Input ref={combinedRef} {...commonProps} />
      ) : (
        <Styled.Input {...commonProps} ref={registration.ref} />
      )}
      {rightCustomNode && (
        <Styled.CustomNodeWrapper>{rightCustomNode}</Styled.CustomNodeWrapper>
      )}
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
