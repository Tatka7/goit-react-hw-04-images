import axios from 'axios';

const key = '38574154-4043e047d2a451e9bea478d9e';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (searchValue, page) => {
  const requestParams = `?key=${key}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;
  const response = await axios.get(`${BASE_URL}${requestParams}`);
  return response.data;
};
