/* constants */
import ACTION from './actionTypes';

/* service */
import { getLatestMoviesByPage } from '../api/movieService';

/* assets */
import noImage from '../assets/img/no_image.png';

const posterURL = "http://image.tmdb.org/t/p/w342";

const findWithAttr = (array, attr, value) => {
    for(let i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

/* actions */
export const moviesIsFetching = () => {
    return {
        type: ACTION.MOVIES_REQUEST
    }
}

export const fetchFavoriteMoviesDone = (favoriteMovies) => {
    return {
        type: ACTION.FAVORITE_MOVIES_RESPONSE,
        favoriteMovies,
    }
}

export const fetchLatestMoviesDone = (latestMovies, curPage, maxPage) => {
    return {
        type: ACTION.LATEST_MOVIES_RESPONSE,
        latestMovies,
        curPage,
        maxPage,
    }
}

export const setMovieToFavoriteDone = (favoriteMovies_updated, latestMovies_updated) => {
	console.log("TCL: setMovieToFavoriteDone -> setMovieToFavoriteDone");
    return {
        type: ACTION.SET_MOVIE_TO_FAVORITE,
        favoriteMovies_updated,
        latestMovies_updated,
    }
}

export const unsetMovieFromFavoriteDone = (favoriteMovies_updated) => {
    console.log("TCL: unsetMovieFromFavoriteDone -> unsetMovieFromFavoriteDone");
    return {
        type: ACTION.UNSET_MOVIE_FROM_FAVORITE,
        favoriteMovies_updated,
    }
    
}

/* thunk */ 

export const getLatestMovies = (page) => {
    return (dispatch, getState) => {
        dispatch(moviesIsFetching());
        dispatch(getFavoriteMovies());

        getLatestMoviesByPage(page)
            .then(({ data }) => {
				console.log("TCL: getLatestMoviesByPage -> data", data)
                const arrayOfMovies = data.results.map((item) => {
                    const { favoriteMovies } = getState().moviesReducer;
                    const isFavorite = favoriteMovies.some((favMov) => {
                        return favMov.id == item.id;
                    });

                    return { poster_url: item.poster_path ? (posterURL + item.poster_path) : noImage, 
                            title: item.title, 
                            id: item.id, 
                            overview: item.overview,
                            release_date: item.release_date,
                            vote_average: item.vote_average,
                            favorite: isFavorite,
                            rating: item.adult ? 'NC-17' : 'R' }
                });
                dispatch(fetchLatestMoviesDone(arrayOfMovies, page, data.total_pages));
            });
    };
}

export const getFavoriteMovies = () => {
    return (dispatch) => {
        dispatch(moviesIsFetching());

        const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
		console.log("TCL: getFavoriteMovies -> favoriteMovies", favoriteMovies)

        if (favoriteMovies && favoriteMovies.length > 0)
            dispatch(fetchFavoriteMoviesDone(favoriteMovies));
    }
}

export const setLatestMovieToFavorite = (mId) => {
    return (dispatch, getState) => {
        const { latestMovies, favoriteMovies } = getState().moviesReduce;
        const index = findWithAttr(latestMovies, 'id', mId);
        const movie = latestMovies[index];

        movie.favorite = true;
        favoriteMovies.push(movie);

        dispatch(setMovieToFavoriteDone(favoriteMovies, latestMovies));
        dispatch(saveFavoriteMoviesToLocalStore());
    }
}

export const unsetMovieFromFavorite = (mId) => {
    return (dispatch, getState) => {
        const { favoriteMovies } = getState().moviesReduce;
        const index = findWithAttr(favoriteMovies, 'id', mId);
        const movie = favoriteMovies[index];

        movie.favorite = false;
        favoriteMovies.splice(index, 1);
        dispatch(unsetMovieFromFavoriteDone(favoriteMovies));
        dispatch(saveFavoriteMoviesToLocalStore());
    }
}

export const saveFavoriteMoviesToLocalStore = () => {
    return (dispatch, getState) => {
        const { favoriteMovies } = getState().moviesReduce;
        localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    }
}
