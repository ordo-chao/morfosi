import { createMMKV } from 'react-native-mmkv';

// Create one persistent MMKV instance for Morfosi.
export const storage = createMMKV({
  id: 'morfosi-storage',
});

// STRING
export const setString = (key, value) => {
  storage.set(key, value);
};

export const getString = key => {
  return storage.getString(key);
};

// BOOLEAN
export const setBoolean = (key, value) => {
  storage.set(key, value);
};

export const getBoolean = key => {
  return storage.getBoolean(key);
};

// NUMBER
export const setNumber = (key, value) => {
  storage.set(key, value);
};

export const getNumber = key => {
  return storage.getNumber(key);
};

// REMOVE A SINGLE KEY
export const remove = key => {
  return storage.remove(key);
};

// CLEAR ALL KEYS
export const clearAll = () => {
  storage.clearAll();
};

// CHECK WHETHER A KEY EXISTS
export const contains = key => {
  return storage.contains(key);
};

// GET ALL STORED KEYS
export const getAllKeys = () => {
  return storage.getAllKeys();
};