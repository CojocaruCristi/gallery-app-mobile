import React, {memo} from 'react';
import { View, StyleSheet } from 'react-native';
import ImagesRow from './ImagesRow';
import { chunker } from '../../helpers/helpers';
const ImagesContainer = ({data}) => {
 
    const chunkedData = chunker(data);

  return (
    <View style={styles.container}>
          <ImagesRow key={Math.random()} data={chunkedData[0]} animationDuration={650} />
          <ImagesRow key={Math.random()} data={chunkedData[1]} animationDuration={750} />
          <ImagesRow key={Math.random()} data={chunkedData[2]} animationDuration={550} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    zIndex: -1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
});


export default memo(ImagesContainer);