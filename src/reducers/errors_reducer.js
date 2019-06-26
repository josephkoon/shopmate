import {
	SET_REGISTRATION_ERROR,
	SET_LOGIN_ERROR,
} from '../actions/types';


export default function(state={registrationError:null, loginError:null}, action){
	switch(action.type){


	case SET_REGISTRATION_ERROR:
		return {...state, registrationError:action.payload};

	case SET_LOGIN_ERROR:
		return {...state, loginError:action.payload}


	default:
		return state;
	}
}