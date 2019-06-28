import {
	SET_AUTH_ERROR,
	CLEAR_AUTH_ERROR,
} from '../actions/types';


export default function(state={authError:null}, action){
	switch(action.type){


	case SET_AUTH_ERROR:
		return {...state, authError:action.payload};

	case CLEAR_AUTH_ERROR:
		return {...state, authError:null};


	default:
		return state;
	}
}