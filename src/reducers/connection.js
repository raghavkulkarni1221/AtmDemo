import { handleActions } from 'redux-actions';
import * as actions from '../actions/connection';

const initialState = {
    connectionStatus: false
};

export default handleActions({
    [actions.updateConnectionStatus]: (state, action) => {
        let connectionStatus = false;
        if (action.payload) {
            connectionStatus = action.payload;
        }
        return { ...state, connectionStatus };
    }
}, initialState);