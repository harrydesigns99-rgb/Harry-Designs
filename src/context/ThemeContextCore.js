import { createContext } from 'react';
import { THEMES } from '@/constants/themes';

export const ThemeContext = createContext({
  theme: 'editorial',
  setTheme: () => {},
  themes: THEMES,
  cycleTheme: () => {},
});
