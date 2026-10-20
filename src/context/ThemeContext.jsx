import { useEffect } from 'react';
import { THEMES } from '@/constants/themes';
import { ThemeContext } from './ThemeContextCore';

export const ThemeProvider = ({ children }) => {
  const theme = 'editorial';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', 'editorial');
      try {
        localStorage.setItem('harry_designs_theme', 'editorial');
      } catch {
        // ignore
      }
    }
  }, []);

  const setTheme = () => {};
  const cycleTheme = () => {};

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

