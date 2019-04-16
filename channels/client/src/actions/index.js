import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types';
import streams from '../apis/streams';
import history from '../history';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

//create a new stream record
export const createStream = formValue => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post('/streams', { ...formValue, userId });

    dispatch({ type: CREATE_STREAM, payload: response.data });
    //do some programmatic navigation to get the user back to the root route
    history.push('/'); //where we want the user goes to
};

//fetch all stream records
export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: response.data });
};

//fetch a single stream record
export const fetchStream = id => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
};

//update a stream record, so first fetch stream and then create a new stream
export const editStream = (id, formValue) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValue);

    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/');
};

//delete a stream record
export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
    //when users deleted one of the stream, then nvigate back to the main page
    history.push('/');
};
