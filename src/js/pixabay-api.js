import axios from 'axios';

const PIXABAY_API_KEY = '40905423-24d24966a8b04fca12252a818';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = (searchedQuery, currentPage, perPage) => {
  const axiosOptions = {
    params: {
      key: PIXABAY_API_KEY,
      q: searchedQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: currentPage,
      per_page: perPage,
    },
  };

  return axios.get('', axiosOptions);
};
