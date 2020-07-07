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
  Alert,
} from 'react-native';
// import ImagePickerComponent from '../../../components/ImageLoader/ImageLoader';
import {pickImage} from '../../../utils/helpers';
import {paddingStyle, marginStyle} from '../../../utils/loyout';
import {Storage} from '../../../utils/storage';

const EditModal = ({onClose, itemId, data, setData}) => {
  const item = data.filter(({id}) => id === itemId)[0];

  const [fileUri, setFileUri] = useState({uri: item ? item.url : ''});
  const [title, setTitle] = useState(item ? item.title : '');

  console.log(item);

  const editPhoto = async () => {
    const newItem = {
      id: item.id,
      title: title.length === 0 ? 'untitled' : title,
      url: fileUri.uri,
    };
    const newData = data.map(photo => {
      if (photo.id === newItem.id) {
        return newItem;
      } else {
        return photo;
      }
    });

    await Storage.setJSON(Storage.store.data, newData);
    setData(newData);
  };

  const handleSave = async () => {
    await editPhoto();
    onClose();
  };

  const handleDelete = async () => {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const newData = data.filter(({id}) => id !== itemId);
            await Storage.setJSON(Storage.store.data, newData);
            setData(newData);
            onClose();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <Modal animationType="fade" transparent={true} visible={true}>
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
            <TouchableHighlight
              style={[styles.btn, styles.danger]}
              onPress={handleDelete}
              disabled={fileUri === null}>
              <Text>delete</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.btn, styles.success]}
              onPress={handleSave}
              disabled={fileUri === null}>
              <Text style={styles.text}>Save</Text>
            </TouchableHighlight>
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
    ...marginStyle(10, 0, 0),
    backgroundColor: 'pink',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
  success: {
    backgroundColor: 'green',
  },
  danger: {
    backgroundColor: 'red',
  },
  text: {
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

export default EditModal;
