import { createReducer, createActions, Types as ReduxSauceTypes } from 'reduxsauce'

const { Types, Creators } = createActions({
    loginRequest: ['email', 'password'],
    loginSuccess: ['user'],
    loginFailure: ['error'],
    userRegistered: ['user'],
    logout: null
})

export const LoginTypes = Types;
export default Creators;

export const INITIAL_STATE = {
    user: null,
    fetching: false,
    error:''
}

export const LoginSelectors = {
    getUser: state => state['login'].user,
    getFetching: state => state['login'].fetching,
    getError: state => state['login'].error;    
};

export const request = (state,action) => {
    return { ...state, fetching: true}
}

export const success = (state,{user}) => {
    return { ...state, user, fetching: false }
}

export const failure = (state, {error}) => {
    return { ...state, fetching: false, error}
}

export const registered = (state, {user}) => {
    return { ...state, user, fetching: false}
}

export const logout = (state) => {
    return { ...state }
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGIN_REQUEST]: request,
    [Types.LOGIN_SUCCESS]: success,
    [Types.LOGIN_FAILURE]: failure,
    [Types.USER_REGISTERED]: registered,
    [Types.LOGOUT]: logout,
    [ReduxSauceTypes.DEFAULT]: defaultHandler
})