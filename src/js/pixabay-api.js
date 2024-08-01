import axios from "axios";

const apiKey = "11359528-a3a233b98fbb1427184d51103";
const URL = "https://pixabay.com/api/";

async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const searchParams = new URLSearchParams({
      key: apiKey,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: perPage,
    });

    const response = await axios.get(`${URL}?${searchParams}`);
    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні даних', error);
    throw error;
  }
}

export { fetchImages };