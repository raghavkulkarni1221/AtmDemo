import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import reducer from './reducers';
import thunk from 'redux-thunk';

export const store = createStore(reducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
