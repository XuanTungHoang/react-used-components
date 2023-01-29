import '@mui/material/styles/';
import '@mui/material/styles/createTypography';
import '@mui/material/styles/createPalette';
import { ThemeColors } from '@themes/palette';

declare module '@mui/material/styles' {
  interface Palette {
    color: typeof ThemeColors;
  }
  interface PaletteOptions {
    color: typeof ThemeColors;
  }
  interface TypeBackground {
    secondary?: string;
  }
  interface Theme {
    customShadows: Theme['shadows'];
  }
}

declare module '@mui/material/styles/createTypography' {
  interface TypographyOptions {
    fontWeightSemiBold?: number;
  }
}

