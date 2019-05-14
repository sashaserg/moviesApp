/* library */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react';
import ReactTooltip from 'react-tooltip'
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { ClipLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { getLatestMovies } from '../../actions/moviesActionCreator'

/* style */
import './MainPage.sass';

/* store */
import MovieStore from '../../store/MovieStore/MovieStore.js';

/* component */
import MovieDetailModal from '../../component/MovieDetailModal/MovieDetailModal.js';


@observer
class MainPage extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      curMovie: null,
    };
  }

  componentDidMount() {
    //MovieStore.getLatestMovies(1);
    this.props.fetchLatestMovies(1);
  }

  changePageHandler = (curPage, pageSize) => {
		MovieStore.getLatestMovies(curPage);
  }

  movieSelectHandler = (movieIndex) => {
    this.setState({
      curMovie: movieIndex,
      showModal: true,
    }, () => {console.log(this.state)});
  }

  nextMovieModalHandler = () => {
    if (MovieStore.latestMovies.length > this.state.curMovie + 1)
      this.setState({
        curMovie: this.state.curMovie + 1,
      })
    else if((MovieStore.latestMovies.length == this.state.curMovie + 1) && MovieStore.curPage < MovieStore.maxPage) {
      MovieStore.getLatestMovies(MovieStore.curPage + 1)
        .then(() => {
          this.setState({
            curMovie: 0,
          });
        })
      
    }
    
  }

  backToListModalHandler = () => {
    this.setState({
      curMovie: null,
      showModal: false,
    })
  }

  renderLatestMovies = () => {
    return(
      <div className={'movieList'}>
        { 
          MovieStore.latestMovies.map((item, index) => {
            return  <div className={'movieItem'} key={index}>
                      <img  src       = {item.poster_url} 
                            data-tip  = {item.title} 
                            onClick   = {() => this.movieSelectHandler(index)}/>
                    </div>
          })
        }
        <ReactTooltip delayShow={300} effect={'solid'} type={'info'}/>
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
        <div className='MainPage-container'>
          <div className={'wrapper' + wrapperClass}>
            <div className={'title'}><p>Latest Releases</p></div>
            <div className={'content'}>
              { !MovieStore.isFetching ? this.renderLatestMovies() : this.renderSpinner()}
              <div className={'pagination'}>
                <Pagination defaultCurrent={MovieStore.curPage} total={MovieStore.maxPage} defaultPageSize={1} onChange={this.changePageHandler}/>
              </div>
            </div>
          </div>
          <MovieDetailModal showModal         = { this.state.showModal }
                            movieList         = { MovieStore.latestMovies } 
                            curMovie          = { this.state.curMovie } 
                            nextMovieHandler  = { this.nextMovieModalHandler }
                            backToListHandler = { this.backToListModalHandler }/>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      latestMovies: state.moviesReducer.latestMovies,
      isFetching: state.moviesReducer.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchLatestMovies: (page) => dispatch(getLatestMovies(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);