/* library */
import React, {Component, PropTypes} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

/* style */
import './Header.sass';

/* store */
import MovieStore from '../../store/MovieStore/MovieStore.js';

class Header extends Component
{
  render()
  {
    return (
        <div className='Header-container'>
            <div className={'brandField'}>
                <Link to='/'>
                  <FontAwesomeIcon icon={'kiss-beam'} className={'icon'}/>
                </Link>
                <span>Movies</span>
            </div>
            <div className={'myAccountField'}>
                <Link to='/favorite'>
                  <span className={'btn'}>My Account</span>
                  <FontAwesomeIcon icon={'chevron-down'} className={'icon'}/>
                </Link>
            </div>
        </div>
    )
  }
}

export default Header;