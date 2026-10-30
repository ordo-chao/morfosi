import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { changeIcon } from 'react-native-change-icon';

export const useDynamicIcon = () => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const iconName = colorScheme === 'dark' ? 'Dark' : 'Light';
    
    // The string passed here must match the alias suffix in your manifest.
    // For ".MainActivityDark", you pass "Dark".
    // For ".MainActivityLight", you pass "Light".
    changeIcon(iconName).catch((err) => {
      console.warn('Failed to change app icon:', err);
    });
  }, [colorScheme]);
};