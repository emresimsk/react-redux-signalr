import { SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE, SIGNAL_R_SET_NOTIFICATION } from '../types';
import createDispatcher from '../../utils/createDispatcher'
import api from '../../api';
import _ from 'lodash';

export function sendMesage(data) {
    return dispatch => {
        dispatch(createDispatcher(SEND_MESSAGE_REQUEST, data));
        return api
            .send(data)
            .then(res => {
                dispatch(createDispatcher(SIGNAL_R_SET_NOTIFICATION, data));  // => set signalr notification
                dispatch(createDispatcher(SEND_MESSAGE_SUCCESS, res.data.response));
                return res;
            }).catch(err => {
                dispatch(createDispatcher(SEND_MESSAGE_FAILURE, err.response));
                return err;
            });
    };
}



export default function reducer(
    state = {
        isFetching: false,
        isLoaded: false,
        isFailure: false,
    },
    action,
) {
    switch (action.type) {
        case SEND_MESSAGE_REQUEST:
            return { ...state, isFetching: true, isLoaded: false, isFailure: false };
        case SEND_MESSAGE_SUCCESS:
            return { ...state, isFetching: false, isLoaded: true, isFailure: false, data: action.payload };
        case SEND_MESSAGE_FAILURE:
            return { ...state, isFetching: false, isLoaded: false, isFailure: true };
        default:
            return state;
    }
}