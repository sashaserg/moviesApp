/* library */
import { observable, action } from "mobx";

/* service */
import { getLatestMoviesByPage } from '../../api/movieService.js';

const posterURL = "http://image.tmdb.org/t/p/w342";

class MovieStore {
    
    @observable latestMovies;
    @observable favoriteMovies;
    @observable maxPage;
    @observable curPage;
    @observable isFetching;

    constructor() {
        this.latestMovies = [];
        this.favoriteMovies = [];
        this.isFetching = false;
    }

    @action('fetch latest movies by page number')
    getLatestMovies(page) {
        this.isFetching = true;
        this.curPage = page;    

        getLatestMoviesByPage(page)
            .then(({ data }) => {
				console.log("TCL: MovieStore -> getLatestMovies -> data", data)
                const arrayOfMovies = data.results.map((item) => {
                    return { poster_url: posterURL + item.poster_path, 
                             title: item.title, 
                             id: item.id, 
                             overview: item.overview,
                             release_date: item.release_date,
                             vote_average: item.vote_average }
                });
                this.latestMovies = arrayOfMovies;
                this.maxPage = data.total_pages;
                this.isFetching = false;
            });
    }

    @action('fetch favorite movies from locale store')
    getFavoriteFromLocalStore() {

    }

    @action('set movie to favorite movie')
    setMovieToFavorite(mId) {
        const movie = this.latestMovies[mId];
        movie.favorite = true;
        this.favoriteMovies.push(movie);
    }

    @action('unset movie from favorite')
    unsetMovieFromFavorite(mId) {
        const movie = this.favoriteMovies[mId];
        movie.favorite = false;
        this.favoriteMovies.splice(mId, 1);
    }

}
export default new MovieStore();