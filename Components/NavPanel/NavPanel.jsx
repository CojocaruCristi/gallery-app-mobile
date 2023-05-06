import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import { sagaActions } from '../../Sagas/sagaActions';
import { toggleIsDataLoading, clearImagesState, setSelectedTopicType } from '../../Store/imagesReducerSlice';
const NavPanel = ({topics, openSearchInput, selectedTopicType}) => {
  const defaultTopic = {title: 'Mixed', id: null}
  const dispatch = useDispatch()


  const onTopicSelect = (topic) => {

    if(selectedTopicType.title === topic.title) {
      return;
    }

    dispatch(setSelectedTopicType({title: topic.title, id: topic.id}))
    dispatch(clearImagesState());
    dispatch(toggleIsDataLoading(true));
    if(topic.id) {
      dispatch({type: sagaActions.FETCH_IMAGES_BY_TOPIC, topicId: topic.id});
      return;
    }

    dispatch({type: sagaActions.FETCH_IMAGES});
  }


  return (
    <View style={styles.panelContainer}>
      <TouchableOpacity onPress={() => openSearchInput((prevState) => !prevState)} style={[styles.button, styles.iconButton]}>
        <AntDesign name="search1" size={17} color={selectedTopicType.title === "Search" ? "#ecf0f1" : "#95a5a6"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onTopicSelect(defaultTopic)} style={styles.button}>
        <Text style={[styles.title, selectedTopicType.title === 'Mixed' ? styles.selectedButton : null]}>Mixed</Text>
      </TouchableOpacity>
      {
        topics.map((topic) => {

          return (
          <TouchableOpacity key={topic.id} onPress={() => onTopicSelect(topic)}  style={styles.button}>
            <Text style={[styles.title, selectedTopicType.id === topic.id ? styles.selectedButton : null]}>{topic.title}</Text>
          </TouchableOpacity>
          )
        })
      }
    
    </View>
  );
};

const styles = StyleSheet.create({
  panelContainer: {

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 80 : 40,
    left: 0,
    right: 0,
    height: 80,
    paddingHorizontal: 10,
    borderRadius: 40,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 8,
    fontSize: 13,
  },
  iconButton: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    color: '#95a5a6',
    fontSize: 13,
    fontWeight: 'bold'
  },
  selectedButton: {
    color: '#ecf0f1',
  }
});
export default NavPanel;