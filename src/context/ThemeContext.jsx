import { useState, useEffect } from 'react';
import { sound } from '@/utils/audio';
import { THEMES } from '@/constants/themes';
import { ThemeContext } from './ThemeContextCore';

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('harry_designs_theme');
        if (stored && THEMES.some((t) => t.id === stored)) {
          return stored;
        }
      } catch {
        // ignore
      }
    }
    return 'editorial';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      try {
        localStorage.setItem('harry_designs_theme', theme);
      } catch {
        // ignore
      }
    }
  }, [theme]);

  const setTheme = (newTheme) => {
    if (newTheme === theme) return;
    sound.playSwitch();
    setThemeState(newTheme);
  };

  const cycleTheme = () => {
    const currentIndex = THEMES.findIndex((t) => t.id === theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex].id);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

