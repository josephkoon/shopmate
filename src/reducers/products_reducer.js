import {
	GET_PRODUCTS,
	GET_PRODUCT,
	GET_PRODUCT_REVIEWS,
	GET_PRODUCT_ATTRIBUTES,
} from '../actions/types';


export default function(state={products:[], count:null, product:null, attributes:[], reviews:[]}, action){
	switch(action.type){


	case GET_PRODUCTS:
		return {...state, products:action.payload.rows, count:action.payload.count};

	case GET_PRODUCT:
		return {...state, product:action.payload};


	case GET_PRODUCT_REVIEWS:
		return {...state, reviews:action.payload};

	case GET_PRODUCT_ATTRIBUTES:
		return {...state, attributes:action.payload}


	default:
		return state;
	}
}