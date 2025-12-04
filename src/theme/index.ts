const sizes = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1200px',
};

export const DefaultTheme = {
  colors: {},
  media: {
    mobile: `@media (max-width: ${sizes.mobile})`,
    tablet: `@media (max-width: ${sizes.tablet})`,
    desktop: `@media (max-width: ${sizes.desktop})`,
  },
};

export type Theme = typeof DefaultTheme;
