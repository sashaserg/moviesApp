/* library */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react';
import ReactTooltip from 'react-tooltip'
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { ClipLoader } from 'react-spinners';
import { connect } from 'react-redux';

/* action */
import { getLatestMovies } from '../../actions/moviesActionCreator'

/* style */
import './MainPage.sass';

/* component */
import MovieDetailModal from '../../component/MovieDetailModal/MovieDetailModal.js';

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
    this.props.getLatestMovies(1);
  }

  changePageHandler = (curPage, pageSize) => {
		this.props.getLatestMovies(curPage);
  }

  movieSelectHandler = (movieIndex) => {
    this.setState({
      curMovie: movieIndex,
      showModal: true,
    }, () => {console.log(this.state)});
  }

  nextMovieModalHandler = () => {
    if (this.props.latestMovies.length > this.state.curMovie + 1)
      this.setState({
        curMovie: this.state.curMovie + 1,
      })
    else if((this.props.latestMovies.length == this.state.curMovie + 1) && this.props.curPage < this.props.maxPage) {
      this.props.getLatestMovies(this.props.curPage + 1)
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
          this.props.latestMovies.map((item, index) => {
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
              { !this.props.isFetching ? this.renderLatestMovies() : this.renderSpinner()}
              <div className={'pagination'}>
                <Pagination current={this.props.curPage} total={this.props.maxPage} defaultPageSize={1} onChange={this.changePageHandler}/>
              </div>
            </div>
          </div>
          <MovieDetailModal showModal         = { this.state.showModal }
                            movieList         = { this.props.latestMovies } 
                            curMovie          = { this.state.curMovie } 
                            nextMovieHandler  = { this.nextMovieModalHandler }
                            backToListHandler = { this.backToListModalHandler }/>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
	// console.log("TCL: mapStateToProps -> state", state)
  return {
      latestMovies: state.moviesReducer.latestMovies,
      curPage: state.moviesReducer.curPage,
      maxPage: state.moviesReducer.maxPage,
      isFetching: state.moviesReducer.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLatestMovies: async (page) => dispatch(getLatestMovies(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);