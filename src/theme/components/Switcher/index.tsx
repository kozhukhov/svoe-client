import { FC } from 'react';

import * as Styled from './styled';

type Props = {
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  setValue: (value: string) => void;
};

export const Switcher: FC<Props> = ({ options, value, setValue }) => {
  if (options.length === 0) return null;

  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  return (
    <Styled.Switcher $activeIndex={activeIndex} $count={options.length}>
      {options.map((option) => (
        <Styled.SwitcherItem
          $active={option.value === value}
          aria-pressed={option.value === value}
          key={option.value}
          type="button"
          onClick={() => setValue(option.value)}
        >
          <Styled.SwitcherLabel
            color={option.value === value ? '#1D2939' : '#6b7280'}
          >
            {option.label}
          </Styled.SwitcherLabel>
        </Styled.SwitcherItem>
      ))}
    </Styled.Switcher>
  );
};
