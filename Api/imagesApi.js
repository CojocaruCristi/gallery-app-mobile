import apiInstance from './configureApi';

const ImagesApi = {
    getImages() {
        return apiInstance.get('/photos?page=1&per_page=30')
    },
    getImagesTopics() {
        return apiInstance.get('/topics?page=1&per_page=3');
    },
    getImagesByTopic(topicId) {
        return apiInstance.get(`/topics/${topicId}/photos?page=1&per_page=30`);
    },
    searchImages(query) {
        return apiInstance.get(`/search/photos?query=${query}&page=1&per_page=30`)
    }
}

export default ImagesApi;