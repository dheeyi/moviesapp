import axios from 'axios';
import { TMDB_BASE_URL, TMDB_ACCESS_TOKEN } from '@env';

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      params: {
        language: 'en-US',
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Error API:', error);
  }
};

export const getRatedMovies = async () => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/top_rated`, {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      params: {
        language: 'en-US',
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Error API:', error);
  }
};

export const getUpComingMovies = async () => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/upcoming`, {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      params: {
        language: 'en-US',
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Error API:', error);
  }
};

