import NetInfo, {
  useNetInfo,
} from '@react-native-community/netinfo';

// GET CURRENT NETWORK STATE
export const getNetworkState = async () => {
  return await NetInfo.fetch();
};

// CHECK INTERNET CONNECTIVITY
export const isInternetConnected = async () => {
  const state = await NetInfo.fetch();

  return (
    Boolean(state.isConnected) &&
    state.isInternetReachable !== false
  );
};

// CHECK CONNECTION TYPE
export const getConnectionType = async () => {
  const state = await NetInfo.fetch();

  return state.type;
};

// CHECK WIFI CONNECTION
export const isWifiConnected = async () => {
  const state = await NetInfo.fetch();

  return state.type === 'wifi' && state.isConnected === true;
};

// CHECK MOBILE DATA
export const isMobileDataConnected = async () => {
  const state = await NetInfo.fetch();

  return state.type === 'cellular' && state.isConnected === true;
};

// LISTEN TO NETWORK CHANGES
export const subscribeToNetworkChanges = callback => {
  return NetInfo.addEventListener(callback);
};

// REACT HOOK
export { useNetInfo };