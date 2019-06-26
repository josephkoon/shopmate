import {
	SET_USER,
	CLEAR_USER,
} from '../actions/types';


export default function(state={user:null}, action){
	switch(action.type){


	case SET_USER:
		return {...state, user:action.payload};

	case CLEAR_USER:
		return {...state, user:null}

	default:
		return state;
	}
}