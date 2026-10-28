import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { dark, light } from './tokens';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme(); // 'light' | 'dark' | null

  // 'system' => follow OS; 'light'/'dark' => pinned by user
  const [mode, setMode] = useState('system');

  const resolvedMode = mode === 'system'
    ? (systemScheme || 'dark') // fallback to dark if OS returns null
    : mode;

  const colors = resolvedMode === 'light' ? light : dark;

  const value = {
    mode,                 // 'light' | 'dark' | 'system'
    resolvedMode,         // effective mode after 'system' resolution
    colors,
    isDark: resolvedMode === 'dark',
    setMode,
    toggle: () => setMode(m => (m === 'dark' ? 'light' : 'dark')),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}