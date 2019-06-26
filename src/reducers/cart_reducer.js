import {
	SETUP_CART,
	GET_CART,
	GET_CART_TOTAL,
	EMPTY_CART,
} from '../actions/types';


export default function(state={cart_id:null, cart:[], total:null}, action){
	switch(action.type){


	case SETUP_CART:
		return {...state, cart_id:action.payload};

	case GET_CART:
		return {...state, cart:action.payload}

	case GET_CART_TOTAL:
		return {...state, total:action.payload}

	case EMPTY_CART:
		return {...state, cart:[]}


	default:
		return state;
	}
}