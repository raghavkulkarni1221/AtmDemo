import { combineReducers } from 'redux';
import connection from './connection';
import amount from './amount';

export default combineReducers({
    connection,
    amount
})