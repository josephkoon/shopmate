import {
	GET_SHIPPING_REGIONS,
	GET_SHIPPING_OPTIONS,
	GET_TAXES,
} from '../actions/types';


export default function(state={ options:[], regions:[], taxes:[] }, action){
	switch(action.type){


	case GET_SHIPPING_OPTIONS:
		return {...state, options:action.payload};

	case GET_SHIPPING_REGIONS:
		return {...state, regions:action.payload};

	case GET_TAXES:
		return {...state, taxes:action.payload};



	default:
		return state;
	}
}