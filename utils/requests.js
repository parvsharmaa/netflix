const API_KEY = 'a5f6c076';
const BASE_URL = 'https://www.omdbapi.com';

// OMDb API requests
const requests = {
  fetchTrending: `${BASE_URL}/?apikey=${API_KEY}&s=new&type=movie`,
  fetchSeries: `${BASE_URL}/?apikey=${API_KEY}&s=new&type=series`,
  fetchTopRated: `${BASE_URL}/?apikey=${API_KEY}&s=top&type=movie`,
  fetchActionMovies: `${BASE_URL}/?apikey=${API_KEY}&s=action&type=movie`,
  fetchComedyMovies: `${BASE_URL}/?apikey=${API_KEY}&s=comedy&type=movie`,
  fetchHorrorMovies: `${BASE_URL}/?apikey=${API_KEY}&s=horror&type=movie`,
  fetchRomanceMovies: `${BASE_URL}/?apikey=${API_KEY}&s=romance&type=movie`,
  fetchDocumentaries: `${BASE_URL}/?apikey=${API_KEY}&s=documentary&type=movie`,
};

export default requests;
