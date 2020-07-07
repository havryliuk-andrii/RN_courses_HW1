import React, {useState, useContext} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Button,
  Image,
  TouchableHighlight,
} from 'react-native';
// import ImagePickerComponent from '../../../components/ImageLoader/ImageLoader';
import {pickImage} from '../../../utils/helpers';
import {paddingStyle, marginStyle} from '../../../utils/loyout';
import {Storage} from '../../../utils/storage';

const MainModal = ({isVisible, onClose, setData, data}) => {
  const [fileUri, setFileUri] = useState(null);
  const [title, setTitle] = useState('');

  const addPhoto = async () => {
    const newItem = {
      id: (+new Date()).toString(36),
      title: title.length === 0 ? 'untitled' : title,
      url: fileUri.uri,
    };

    console.log([newItem, ...data]);
    await Storage.setJSON(Storage.store.data, [newItem, ...data]);
    setData(prev => [newItem, ...prev]);
  };

  const handleSave = async () => {
    await addPhoto();
    setFileUri(null);
    setTitle('');
    onClose();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <TextInput
              placeholder="title"
              value={title}
              onChangeText={text => setTitle(text)}
            />
            {fileUri && <Image source={fileUri} style={styles.img} />}
            <TouchableHighlight
              style={[styles.btn, styles.alt]}
              onPress={() => pickImage(setFileUri)}>
              <Text style={styles.btnText}>Take image</Text>
            </TouchableHighlight>
            <Button
              title="Save"
              onPress={handleSave}
              disabled={fileUri === null}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  btn: {
    ...paddingStyle(10, 0),
    ...marginStyle(0, 0, 10),
    backgroundColor: 'pink',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
  success: {
    backgroundColor: 'green',
    color: 'white',
  },
  container: {
    backgroundColor: '#fff',
    width: '50%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: '100%',
    height: 200,
    ...marginStyle(10, 0),
  },
});

export default MainModal;
