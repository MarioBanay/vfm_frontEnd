import * as actionTypes from './actions';

const initialState = {
    isUserLoggedIn: false,
    authenticatedUsername: '',
}

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE_USER:

            return {
                ...state,
                authenticatedUsername: action.username,
                isUserLoggedIn: true
            }

        default:
            return state;
    }
}

export default authenticationReducer;