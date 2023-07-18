import axios from 'axios';
axios.defaults.headers.common["x-api-key"] = "live_bUklycrhzDLqiFX58LdMSIbPTbi6cZexHgNPp7cEpjFq7TPxMJ5LfJcTzoYnQT00";

const API_HOST = 'https://api.thecatapi.com/';
const API_VERSION = 'v1/';
const API_ENDPOINT_COLECTION = 'breeds';
const API_ENDPOINT_SEARCH = 'images/search';

export function fetchBreeds() {
    return axios.get(`${API_HOST}${API_VERSION}${API_ENDPOINT_COLECTION}`)
};

export function fetchCatByBreed(breedId) {
    return axios.get(`${API_HOST}${API_VERSION}${API_ENDPOINT_SEARCH}?breed_ids=${breedId}&has_breeds=1`)
};