/* constants */
import ACTION from '../actions/actionTypes';

const initialState = {
    latestMovies: [],
    favoriteMovies: [],
    maxPage: 0,
    curPage: 0,
    isFetching: false,
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.MOVIES_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null
            }
        }
        case ACTION.LATEST_MOVIES_RESPONSE: {
            return {
                ...state,
                latestMovies: action.latestMovies,
                curPage: action.curPage,
                maxPage: action.maxPage,
                isFetching: false,
                error: null
            }
        }
        case ACTION.FAVORITE_MOVIES_RESPONSE: {
            return {
                ...state,
                favoriteMovies: action.favoriteMovies,
                isFetching: false,
                error: null
            }
        }
        case ACTION.SET_MOVIE_TO_FAVORITE: {
            return {
                ...state,
                favoriteMovies: action.favoriteMovies_updated,
                latestMovies: action.latestMovies_updated,
                error: null,
            }
        }
        case ACTION.UNSET_MOVIE_FROM_FAVORITE: {
            
			console.log("TCL: action.favoriteMovies_updated", action.favoriteMovies_updated)
            return {
                ...state,
                favoriteMovies: action.favoriteMovies_updated,
                error: null,
            }
        }
        default: { return state }
    }
}
