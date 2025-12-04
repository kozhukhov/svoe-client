import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

export type TextFieldProps = {
  registration: UseFormRegisterReturn;
  label?: string;
  error?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  rightCustomNode?: React.ReactNode;
  required?: boolean;
  mask?: string;
  maskChar?: string;
  warning?: string;
};

export type DatePickerFieldProps = Omit<
  TextFieldProps,
  'type' | 'rows' | 'mask' | 'maskChar' | 'rightCustomNode'
> & {
  min?: string;
  max?: string;
  step?: number | string;
};
