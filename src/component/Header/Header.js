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
                <FontAwesomeIcon icon={'kiss-beam'} className={'icon'}/>
                <span>Movies</span>
            </div>
            <div className={'myAccountField'}>
                <a className={'btn'}>My Account</a>
                <FontAwesomeIcon icon={'chevron-down'} className={'icon'}/>
            </div>
        </div>
    )
  }
}

export default Header;