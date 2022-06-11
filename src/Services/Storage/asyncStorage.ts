import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key: string, data: Record<string, any>) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};

export const getData = async (key: string): Promise<null | Record<string, any>> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    return null;
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    // remove error
    return false;
  }
};
