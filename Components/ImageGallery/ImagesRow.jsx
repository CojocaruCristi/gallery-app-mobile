import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, Modal, Animated, Text, ActivityIndicator } from 'react-native';

const ImagesRow = ({data = [], animationDuration}) => {
    const { width } = Dimensions.get('window');
    const [modalImage, setModalImage] = useState(null);
    const [scrollX, setScrollX] = useState(new Animated.Value(0));
    const [isLoading, setIsLoading] = useState(false);


    const openModal = (image) => {
      setModalImage(image);
    }
  
    const closeModal = () => {
      setModalImage(null);
    }



    useEffect(() => {
        Animated.timing(scrollX, {
          toValue: 1.5,
          duration: animationDuration,
          useNativeDriver: true,
        }).start();
      }, []);
    
      const translateX = scrollX.interpolate({
        inputRange: [1, 1.5],
        outputRange: [width, 0],
      });

  return (
    <View style={styles.container}>
    <Animated.ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ transform: [{ translateX }] }}
      >
        <View style={styles.row}>
          {data.map((image, index) => {
            return (
              <TouchableOpacity key={image.id} onPress={() => openModal(image)}>
                <View style={{ width: 150, height: 400, marginRight: 10 }}>
                  <Image
                    source={{ uri: image.urls.small }}
                    style={{ width: 150, height: 400, marginRight: 10 }}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
    </Animated.ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={!!modalImage}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal} />
          {isLoading && <ActivityIndicator style={styles.modalBackground} />}
          <Image
            source={{ uri: modalImage?.urls?.full }}
            style={styles.modalImage}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
          />
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.8,
  },
  modalImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ImagesRow;