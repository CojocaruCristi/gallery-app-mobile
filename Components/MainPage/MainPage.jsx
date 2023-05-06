import { useEffect, useState } from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { sagaActions } from '../../Sagas/sagaActions';
import Header from '../Header/Header';
import NavPanel from '../NavPanel/NavPanel';
import ImagesContainer from '../ImageGallery/ImageGallery';
import { toggleIsDataLoading, toggleAreTopicsLoading, setGlobalError, restoreAppState} from '../../Store/imagesReducerSlice';
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

const MainPage = () => {
    const images = useSelector(state => state.imageReducer.images);
    const isDataLoading = useSelector(state => state.imageReducer.isDataLoading);
    const areTopicsLoading = useSelector(state => state.imageReducer.areTopicsLoading);
    const areSearchResults = useSelector(state => state.imageReducer.areSearchResults);
    const selectedTopicType = useSelector(state => state.imageReducer.selectedTopicType);
    const imagesTopics = useSelector(state => state.imageReducer.imagesTopics);
    const globalError = useSelector(state => state.imageReducer.globalError);

    const dispatch = useDispatch()
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        dispatch(toggleAreTopicsLoading(true));
        dispatch(toggleIsDataLoading(true));
        dispatch({ type: sagaActions.FETCH_IMAGES });
        dispatch({ type: sagaActions.FETCH_TOPICS });
    }, [])

    useEffect(() => {
        if(!!globalError.errorMessage) {
            showMessage({
                message: `${globalError.errorMessage}, please try again later or reload the app.`,
                type: "danger",
                autoHide: false,
                onPress: () => {
                    dispatch(setGlobalError({}));
                    dispatch(restoreAppState());
                }
              });
        }
    }, [globalError])


    return (
        <View style={styles.container}>
            <Header title={"Gallery"} showInput={showInput} setShowInput={setShowInput} />

            {
                isDataLoading && !images.length ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" />
                    </View>
                )
                :
                (
                    areSearchResults ? (

                        <ImagesContainer data={images} />
                    )
                    :
                    (
                        <View style={styles.noSearchResultsContainer}>
                            <Text style={styles.noSearchResultsText}>
                                No search Results.
                            </Text>
                        </View>
                    )
                )
            }

            {
                !areTopicsLoading && (
                    <NavPanel topics={imagesTopics} openSearchInput={setShowInput} selectedTopicType={selectedTopicType} />
                )
            }
            
            <FlashMessage position="top" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'rgb(34,34,37)',
        backgroundColor: 'linear-gradient(148deg, rgba(34,34,37,1) 6%, rgba(8,8,9,1) 20%, rgba(0,0,0,1) 100%)',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100
    },
    noSearchResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noSearchResultsText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        paddingBottom: 100
    }
  });
  

export default MainPage;
