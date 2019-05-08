/* library */
import axios from 'axios'

/* constant */
import { nowPlayingMovieURL, posterURL } from './baseURL';

export const getLatestMoviesByPage = (page) => axios.get(nowPlayingMovieURL, {
    params: {
      page: page
    }
  });
