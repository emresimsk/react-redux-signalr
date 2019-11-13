import { SIGNAL_R_REQUEST, SIGNAL_R_SUCCESS, SIGNAL_R_SET_NOTIFICATION, SIGNAL_R_GET_NOTIFICATION, SIGNAL_R_FAILURE } from '../types'
import createDispatcher from '../../utils/createDispatcher'
import * as SignalR from '@aspnet/signalr';


const hubUrl = 'localhost:5000';

const connectionHub = new SignalR.HubConnectionBuilder()
    .withUrl(hubUrl, { accessTokenFactory: () => 'token', skipNegotiation: true, transport: SignalR.HttpTransportType.WebSockets })
    .configureLogging(SignalR.LogLevel.Trace)
    .build();


export function signalRun() {
    return (dispatch, getState) => {
        dispatch(createDispatcher(SIGNAL_R_REQUEST, null));
        return connectionHub.start()
            .then(res => {

                dispatch(createDispatcher(SIGNAL_R_SUCCESS, connectionHub));

                connectionHub.on('ReceiveMessage', (data) => {
                    console.log(data);
                    dispatch(createDispatcher(SIGNAL_R_GET_NOTIFICATION, data));
                })

                connectionHub.onclose(() => {
                    dispatch(signalRun());
                })

                return res;
            }).catch(err => {
                dispatch(createDispatcher(SIGNAL_R_FAILURE));
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
        case SIGNAL_R_REQUEST:
            return { ...state, isFetching: true, isLoaded: false, isFailure: false };
        case SIGNAL_R_SUCCESS:
            return { ...state, isFetching: false, isLoaded: true, isFailure: false, data: null, connection: action.payload };
        case SIGNAL_R_GET_NOTIFICATION:
            return { ...state, isFetching: false, isLoaded: true, isFailure: false, data: action.payload };  // Get Data
        case SIGNAL_R_SET_NOTIFICATION:
            state.connection.invoke('SendMessage', action.payload)   // Set data 
            return { ...state, isFetching: false, isLoaded: true, isFailure: false };
        case SIGNAL_R_FAILURE:
            return { ...state, isFetching: false, isLoaded: false, isFailure: true, data: null, connection: null };
        default:
            return state;
    }
}