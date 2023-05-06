import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useDispatch } from 'react-redux';
import { sagaActions } from '../../Sagas/sagaActions';
import { toggleIsDataLoading, clearImagesState } from '../../Store/imagesReducerSlice';

const screenWidth = Dimensions.get('window').width;

const Header = ({ title, onMenuPress, showInput, setShowInput  }) => {
  const headerHeight = Platform.OS === 'ios' ? 90 : 70; 

  const [inputVisible, setInputVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const handleSearchValueChange = (value) => {
    setSearchValue(value)
  }

  const handleInputBlur = () => {
    setSearchValue('');
    setShowInput(false);
  }

  const searchImages = () => {
    if(!!searchValue) {
       dispatch(toggleIsDataLoading(true));
       dispatch(clearImagesState());
       dispatch({type: sagaActions.FETCH_IMAGES_SEARCH, query: searchValue});
       setSearchValue('');
      
    }
      setShowInput(false);
    
  }



  useEffect(() => {
    if (showInput) {
      setInputVisible(true);
      Animated.timing(
        fadeAnim,
        {
          toValue: 2.2,
          duration: 500,
          useNativeDriver: true,
        }
      ).start();
    } else {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }
      ).start(() => setInputVisible(false));
    }
  }, [showInput]);
  

  return (
    <View style={[styles.container, { height: headerHeight }]}>
      <Text style={styles.title}>{title}</Text>

      {inputVisible && (
        <Animated.View
          style={{
            opacity: fadeAnim,
            marginTop: -10,
            marginBottom: -5,
            position: 'absolute',
            width: screenWidth,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                }),
              },
            ],
          }}
        >
          <View style={styles.inputContainer} >
            <TextInput 
            style={styles.input} 
            autoFocus={true}
            placeholder="Search"
            value={searchValue}
            onChangeText={handleSearchValueChange}
            onBlur={handleInputBlur}
            onSubmitEditing={searchImages}
            />

          <TouchableOpacity onPress={searchImages} style={[styles.button, styles.iconButton]}>
            <Ionicons name="enter" size={30} color="black" />
          </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <FontAwesome5 name="grip-lines" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.05,
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,

    marginBottom: 15,
  },
  title: {
    color: '#fff',
    fontSize: screenWidth * 0.06,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: screenWidth * 0.03,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    width: screenWidth * 0.6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 10,
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal: 10,
  },
});

export default Header;