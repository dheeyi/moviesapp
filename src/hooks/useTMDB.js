import { useState, useEffect } from 'react';
import axios from 'axios';
import { TMDB_BASE_URL, TMDB_ACCESS_TOKEN } from '@env';

const useTMDB = (endpoint) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/${endpoint}`, {
          headers: {
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          params: {
            language: 'en-US',
            page: 1,
          },
        });
        setData(response.data.results);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [endpoint]);

  return [data, error];
};

export default useTMDB;
