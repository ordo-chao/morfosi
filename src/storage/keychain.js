import * as Keychain from 'react-native-keychain';
import Config from 'react-native-config';

const SERVICE = Config.KEYCHAIN_KEY

// SAVE CREDENTIALS
export const saveCredentials = async (username, password) => {
  try {
    const result = await Keychain.setGenericPassword(
      username,
      password,
      {
        service: SERVICE,
      },
    );

    return Boolean(result);
  } catch (error) {
    console.error('Keychain save error:', error);
    throw error;
  }
};

// GET CREDENTIALS
export const getCredentials = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: SERVICE,
    });

    if (!credentials) {
      return null;
    }

    return {
      username: credentials.username,
      password: credentials.password,
    };
  } catch (error) {
    console.error('Keychain retrieval error:', error);
    throw error;
  }
};

// UPDATE CREDENTIALS
export const updateCredentials = async (username, password) => {
  return saveCredentials(username, password);
};

// RESET CREDENTIALS
export const resetCredentials = async () => {
  try {
    return await Keychain.resetGenericPassword({
      service: SERVICE,
    });
  } catch (error) {
    console.error('Keychain reset error:', error);
    throw error;
  }
};

// CHECK WHETHER CREDENTIALS EXIST
export const hasCredentials = async () => {
  try {
    return await Keychain.hasGenericPassword({
      service: SERVICE,
    });
  } catch (error) {
    console.error('Keychain existence check error:', error);
    throw error;
  }
};