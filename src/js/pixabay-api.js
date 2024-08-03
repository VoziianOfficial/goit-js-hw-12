import axios from "axios";

const apiKey = "11359528-a3a233b98fbb1427184d51103";
const URL = "https://pixabay.com/api/";

export async function fetchImages(query, page = 1, perPage = 15) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: apiKey,
                q: query,
                page: page,
                per_page: perPage,
                image_type: 'photo',
                orientation: 'horizontal',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}