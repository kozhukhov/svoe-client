'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 90px;
  }

  body {
    -webkit-touch-callout: none;
    -webkit-font-smoothing: antialiased;
    width: 100%;
    margin: 0px;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }

  input, textarea, button {
    font-family: Jost, "Jost Fallback";
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyles;
