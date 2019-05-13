/* library */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/* style */
import './MovieDetailsPage.sass';

/* store */
import MovieStore from '../../store/MovieStore/MovieStore.js';

class MovieDetailsPage extends Component {

    setMovieToFavorite = (mId) => {
        console.log(mId);
        MovieStore.setLatestMovieToFavorite(mId);
    } 

    render() {

        

        const movie = this.props.movieList[this.props.curMovie];
        const displayModal = this.props.showModal ? 'block' : 'none';
        const isFavorite = movie.favorite ? 'isFavorite' : '';
        const posterUrl = movie.poster_url;
        console.log(movie);
        const movieDate = new Date(movie.release_date);
        const movieYear = parseInt(movie.release_date);
        const movieDay = movieDate.getDate();
        const movieMonthName = movieDate.toLocaleString('en-us', { month: 'long' });
        
        return(
            <div className={'MovieDetailsPage-container'} style={{display: displayModal}}>
                <div className={'modalBg'} style={{
                    backgroundImage: 'url("' + posterUrl + '")',
                }}></div>
                <div className={'modalContent'}>
                    <div className={'controlHeader'}>
                        <div className={'controlField'} onClick={this.props.backToListHandler}>
                            <div className={'icon'}><FontAwesomeIcon icon={'arrow-alt-circle-left'}/></div>
                            <div className={'title'}>Back<span className={'mobileHide'}> to list</span></div>
                        </div>
                        <div className={'controlField'} onClick={this.props.nextMovieHandler}>
                            <div className={'title'}>Next<span className={'mobileHide'}> Movie</span></div>
                            <div className={'icon'}><FontAwesomeIcon icon={'arrow-alt-circle-right'}/></div>
                        </div>
                    </div>
                    <div className={'content-wrapper'}>
                        <div className={'content'}>
                            <div className={'poster'}>
                                <img src={posterUrl} alt={movie.title}/>
                            </div>

                            <div className={'movieInfoMobile'}>
                                <div className={'toFavoriteField ' + isFavorite} onClick={() => this.setMovieToFavorite(movie.id)}>
                                    <FontAwesomeIcon icon={'star'}/>
                                </div>
                                
                                <span className={'Score'}>
                                    <p className={'detailsTitle'}>Score:</p>
                                    <p className={'detailsValue'}>{movie.vote_average}</p>
                                </span>
                                <span className={'Rating'}>
                                    <p className={'detailsTitle'}>Rating:</p>
                                    <p className={'detailsValue'}>{movie.rating}</p>
                                </span>
                                <span className={'ReleaseDate'}>
                                    <p className={'detailsTitle'}>Release date:</p>
                                    <p className={'detailsValue'}>{`${movieMonthName} ${movieDay}, ${movieYear}`}</p>
                                </span>

                            </div>

                            <div className={'movieInfoField'}>
                                <div className={'toFavoriteField'}>
                                    <a className={isFavorite} onClick={() => this.setMovieToFavorite(movie.id)}>Add to favorite</a>
                                </div>
                                <div className={'movieTitleField'}>
                                    <span className={'title'}>
                                        { `${movie.title} (${parseInt(movie.release_date)})` }
                                    </span>
                                </div>
                                <div className={'movieDetailsField'}>
                                    <span className={'Score'}>
                                        { `Score: ${movie.vote_average}` }
                                    </span>
                                    <span className={'Rating'}>
                                        { `Rating: ${movie.rating}` }
                                    </span>
                                    <span className={'ReleaseDate'}>
                                        { `Release date: ${movieMonthName} ${movieDay}, ${movieYear}` }
                                    </span>
                                </div>
                                <div className={'movieDescriptionField'}>
                                    <p className={'description'}>
                                        { movie.overview }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        );
    }
}

export default MovieDetailsPage;