/* library */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react';
import { ClipLoader } from 'react-spinners';

/* style */
import './FavoritePage.sass';

/* store */
import MovieStore from '../../store/MovieStore/MovieStore.js';

/* component */
import MovieDetailModal from '../../component/MovieDetailModal/MovieDetailModal.js';



@observer
class FavoritePage extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      curMovie: null,
      shouldEraseText: false,
      eraseLength: 120,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', (e) => {
        // e.target.innerWidth
        if(e.target.innerWidth <= 650 && !this.state.shouldEraseText)
            this.setState({
                shouldEraseText: true,
            })
        else if (e.target.innerWidth > 650 && this.state.shouldEraseText)
            this.setState({
                shouldEraseText: false,
            })
    });
    MovieStore.getFavoriteFromLocalStore();
  }

  eraseStringMaxLength = (string, maxLength) => {
    if (string.length > maxLength)
        return string.slice(0, maxLength - 3) + '...';
    else return string
  }

  movieSelectHandler = (movieIndex) => {
    this.setState({
      curMovie: movieIndex,
      showModal: true,
    }, () => {console.log(this.state)});
  }

  nextMovieModalHandler = () => {
    if (MovieStore.favoriteMovies.length > this.state.curMovie + 1)
      this.setState({
        curMovie: this.state.curMovie + 1,
      });
  }

  backToListModalHandler = () => {
    this.setState({
      curMovie: null,
      showModal: false,
    })
  }

  unfavoriteMovieHandler = (mId) => {
    MovieStore.unsetMovieFromFavorite(mId);
  }

  renderFavoriteMovies = () => {
    return(
      <div className={'movieList'}>
        { 
          MovieStore.favoriteMovies.map((item, index) => {
            return  <div className={'listItem'} key={index}>
                        <div className={'moviePoster'}>
                            <img src = { item.poster_url } onClick={() => this.movieSelectHandler(index)}/>
                        </div>
                        <div className={'movieInfo'}>
                            <div className={'header'}>
                                <div className={'title'}>{ item.title }</div>
                                <div className={'unfavoriteBtn'}>
                                    <a onClick={() => this.unfavoriteMovieHandler( item.id )}>unfavorite</a>
                                </div>
                            </div>
                            <div className={'movieDescription'}>
                                <p>{  
                                    !this.state.shouldEraseText ? item.overview 
                                        : this.eraseStringMaxLength(item.overview, this.state.eraseLength) 
                                }</p>
                            </div>
                        </div>
                    </div>
          })
        }
      </div>
    )
  }

 
  renderSpinner = () => {
    return (
      <ClipLoader
        sizeUnit={"px"}
        size={ 100 }
        color={'#123abc'}
        loading={ true }
      />
    );
  }
  
  render()
  {
    const wrapperClass = this.state.showModal ? '-modalActive' : ''; 
    return (
        <div className='FavoritePage-container'>
          <div className={'wrapper' + wrapperClass}>
            <div className={'title'}><p>My favorite</p></div>
            <div className={'content'}>
              { !MovieStore.isFetching ? this.renderFavoriteMovies() : this.renderSpinner()}
            </div>
          </div>
          <MovieDetailModal showModal         = { this.state.showModal }
                            movieList         = { MovieStore.favoriteMovies } 
                            curMovie          = { this.state.curMovie } 
                            nextMovieHandler  = { this.nextMovieModalHandler }
                            backToListHandler = { this.backToListModalHandler }/>
        </div>
    )
  }
}

export default FavoritePage;