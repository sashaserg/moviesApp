/* library */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react';
import ReactTooltip from 'react-tooltip'
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { ClipLoader } from 'react-spinners';

/* style */
import './MainPage.sass';

/* store */
import MovieStore from '../../store/MovieStore/MovieStore.js';

@observer
class MainPage extends Component
{

  componentDidMount() {
    MovieStore.getLatestMovies(1);
  }

  changePageHandler = (curPage, pageSize) => {
		MovieStore.getLatestMovies(curPage);
  }

  renderLatestMovies = () => {
    return(
      <div className={'movieList'}>
        { 
          MovieStore.latestMovies.map((item, index) => {
            return <div className={'movieItem'} key={index}>
              <img src={item.poster_url} data-tip={item.title}/>
              <ReactTooltip effect={'solid'} type={'info'} delayShow={200}/>
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
    return (
        <div className='MainPage-container'>
          <div className={'wrapper'}>
            <div className={'title'}><p>Latest Releases</p></div>
            <div className={'content'}>
              { !MovieStore.isFetching ? this.renderLatestMovies() : this.renderSpinner()}
              <div className={'pagination'}>
                <Pagination defaultCurrent={MovieStore.curPage} total={MovieStore.maxPage} defaultPageSize={1} onChange={this.changePageHandler}/>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default MainPage;