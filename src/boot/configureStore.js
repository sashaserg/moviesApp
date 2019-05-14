/* library */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

/* files */
import combinedReducers from '../reducers/rootReducer'

const configureStore = () => {
    const middleware = [
        thunk,
    ];
    const store = createStore(combinedReducers, compose(applyMiddleware(...middleware)));
    return store;
}

export default configureStore;