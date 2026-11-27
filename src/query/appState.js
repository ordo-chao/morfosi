import { useEffect } from 'react';
import { AppState, Platform } from 'react-native';
import { focusManager } from '@tanstack/react-query';

const useAppState = () => {
  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }

    const subscription = AppState.addEventListener(
      'change',
      status => {
        focusManager.setFocused(status === 'active');
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);
};

export default useAppState;