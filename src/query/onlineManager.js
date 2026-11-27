import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

// Connect network connectivity to TanStack Query.
onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(
      Boolean(state.isConnected) &&
      state.isInternetReachable !== false,
    );
  });
});

export default onlineManager;