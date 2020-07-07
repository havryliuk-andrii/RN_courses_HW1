import {AsyncStorage} from 'react-native';

// D - mean @decorator
const tryCatchD = async func => {
  try {
    await func();
  } catch (error) {
    console.log(error);
  }
};

export class Storage {
  static store = {
    data: 'data',
  };

  static async setJSON(name, value) {
    tryCatchD(
      async () => await AsyncStorage.setItem(name, JSON.stringify(value)),
    );
  }

  static async getJSON(name) {
    const item = await AsyncStorage.getItem(name);
    return JSON.parse(item);
  }

  static async clearAppData() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error clearing app data.');
    }
  }
}
