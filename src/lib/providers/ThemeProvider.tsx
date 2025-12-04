'use client';

import { ReactNode } from 'react';
import { ThemeProvider as BasicThemeProvider } from 'styled-components';
import { DefaultTheme } from 'theme';
import GlobalStyles from 'theme/GlobalStyles';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <GlobalStyles />
      <BasicThemeProvider theme={DefaultTheme}>{children}</BasicThemeProvider>
    </>
  );
};
