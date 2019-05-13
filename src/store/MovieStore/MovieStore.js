/* library */
import { observable, action } from "mobx";

/* service */
import { getLatestMoviesByPage } from '../../api/movieService.js';

/* assets */
import noImage from '../../assets/img/no_image.png';

const posterURL = "http://image.tmdb.org/t/p/w342";

const findWithAttr = (array, attr, value) => {
    for(let i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

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
        return new Promise((res, rej) => {
            this.isFetching = true;
            this.curPage = page;    
            
            this.getFavoriteFromLocalStore();

            getLatestMoviesByPage(page)
                .then(({ data }) => {
                    console.log("TCL: MovieStore -> getLatestMovies -> data", data)
                    const arrayOfMovies = data.results.map((item) => {

                        const isFavorite = this.favoriteMovies.some((favMov) => {
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
                    this.latestMovies = arrayOfMovies;
                    this.maxPage = data.total_pages;
                    this.isFetching = false;
                    res();
                });
        })
    }

    @action('fetch favorite movies from locale store')
    getFavoriteFromLocalStore() {
        const favMov = JSON.parse(localStorage.getItem("favoriteMovies"));
		console.log("TCL: getFavoriteFromLocalStore -> favMov", favMov)
        if (favMov && favMov.length > 0)
            this.favoriteMovies = favMov;
    }

    @action('set favorite movies array to localstorage')
    saveFavoriteMoviesToLocalStore() {
        localStorage.setItem("favoriteMovies", JSON.stringify(this.favoriteMovies));
    }

    @action('set movie to favorite movie')
    setLatestMovieToFavorite(mId) {
        const index = findWithAttr(this.latestMovies, 'id', mId);
        const movie = this.latestMovies[index];
        movie.favorite = true;
        this.favoriteMovies.push(movie);
        this.saveFavoriteMoviesToLocalStore();
    }

    @action('unset movie from favorite')
    unsetMovieFromFavorite(mId) {
        const index = findWithAttr(this.favoriteMovies, 'id', mId);
        const movie = this.favoriteMovies[index];
		console.log("TCL: unsetMovieFromFavorite -> movie", movie)
        movie.favorite = false;
        this.favoriteMovies.splice(index, 1);
        this.saveFavoriteMoviesToLocalStore();
    }

}
export default new MovieStore();