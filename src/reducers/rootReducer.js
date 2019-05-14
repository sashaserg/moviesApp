/* library */
import { combineReducers } from 'redux';

/* reducers */
import moviesReducer from './moviesReducer';

const appReducer = combineReducers({
   moviesReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;