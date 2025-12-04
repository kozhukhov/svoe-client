import React, { FC, useCallback } from 'react';

import * as Styled from './styled';
import { Color, Size, Variant } from './types';

type Props = {
  variant?: Variant;
  label?: string;

  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  marginBottom?: string;
  marginTop?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  size?: Size;
  loading?: boolean;
  color?: Color;
};

export const Button: FC<Props> = ({
  variant = Variant.PRIMARY,
  label,
  onClick,
  disabled = false,
  marginBottom = '0px',
  marginTop = '0px',
  fullWidth = false,
  icon,
  size = Size.MEDIUM,
  loading = false,
  color = Color.DEFAULT,
  ...otherProps
}: Props) => {
  const props = {
    $marginBottom: marginBottom,
    $marginTop: marginTop,
    $variant: variant,
    $fullWidth: fullWidth,
    $iconOnly: !!icon && !label,
    $size: size,
    $color: color,
    ...otherProps,
  };

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        event.stopPropagation();
        onClick(event);
      }
    },
    [onClick],
  );

  return (
    <Styled.Button
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {icon}
      {loading ? 'Обработка...' : label}
    </Styled.Button>
  );
};

export const PrimaryButton: React.FC<Props> = (props) => (
  <Button {...props} variant={Variant.PRIMARY} />
);

export const SecondaryButton: React.FC<Props> = (props) => (
  <Button {...props} variant={Variant.SECONDARY} />
);

export { Color, Size, Variant } from './types';
