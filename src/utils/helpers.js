import ImagePicker from 'react-native-image-picker';

const imagePickOptions = {
  title: 'Select Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export const pickImage = handleUri => {
  ImagePicker.showImagePicker(imagePickOptions, res => {
    if (!res.error && !res.didCancel) handleUri({uri: res.uri});
  });
};
