import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {DataContext} from '../../contexts';
import {paddingStyle} from '../../utils/loyout';
import MainModal from './components/MainModal';
import EditModal from './components/EditModal';
import {Storage} from '../../utils/storage';
import {getMoreData} from '../../api';

const renderItem = ({id, title, url}, index, setEditItemId) => {
  return (
    <TouchableOpacity
      style={[styles.card, index % 2 ? null : styles.offset]}
      onPress={() => setEditItemId(id)}>
      <Image source={{uri: url}} style={styles.img} />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const Main = () => {
  const [data, setData] = useState(useContext(DataContext));
  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const loadMore = async () => {
    const loadedData = await getMoreData(page + 1);
    console.log(loadedData);
    setData(prev => [...prev, ...loadedData]);
    setPage(prev => prev + 1);
  };

  return (
    <View style={styles.wrapper}>
      <Button title="Load more" onPress={() => setIsModalVisible(true)} />
      <FlatList
        data={data}
        style={styles.cards}
        numColumns={2}
        onEndReachedThreshold={1}
        onEndReached={loadMore}
        renderItem={({item, index}) => renderItem(item, index, setEditItemId)}
        keyExtractor={item => item.id.toString()}
      />
      <MainModal
        isVisible={isModalVisible}
        setData={setData}
        onClose={() => setIsModalVisible(false)}
        data={data}
      />
      {editItemId !== null && (
        <EditModal
          setData={setData}
          onClose={() => setEditItemId(null)}
          data={data}
          itemId={editItemId}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {...paddingStyle(10)},
  cards: {
    ...paddingStyle(10, 0),
    marginBottom: 35,
  },
  card: {
    flex: 1,
    width: '50%',
    minHeight: Dimensions.get('window').height / 4 - 15,
    maxWidth: Dimensions.get('window').width / 2 - 5,
  },
  offset: {paddingRight: 10},
  img: {
    width: 'auto',
    height: 150,
  },
});

export default Main;
