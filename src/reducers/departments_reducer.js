import {
	GET_DEPARTMENTS,
} from '../actions/types';


export default function(state={departments:[]}, action){
	switch(action.type){


	case GET_DEPARTMENTS:
		return {...state, departments:action.payload};

	
	default:
		return state;
	}
}