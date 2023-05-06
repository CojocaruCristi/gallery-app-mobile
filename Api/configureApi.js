import axios from "axios";


const apiInstance = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        'Accept-Version': 'v1',
        Authorization: `Client-ID Uzuj4eIgEDavxP9OA_3PRiHjkfk9hQF6y3ICzak4E6g`,
    }
  });





export default apiInstance
