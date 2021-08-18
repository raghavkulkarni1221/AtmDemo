import { handleActions } from 'redux-actions';
import * as actions from '../actions/amount';

const initialState = {
    amount: null
};

export default handleActions({
    [actions.updateAmount]: (state, action) => {
        let amount = null;
        if (action.payload) {
            amount = action.payload;
        }
        return { ...state, amount };
    }
}, initialState);