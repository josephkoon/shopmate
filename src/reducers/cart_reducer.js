import {
	SETUP_CART,
	GET_CART,
	GET_CART_TOTAL,
	EMPTY_CART,
	UPDATE_CART,
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


	case UPDATE_CART:
		let updatedCart = []
		let hash = {}

		let updateCart = action.payload;
		let existingCart = state.cart;

		for(let i=0; i<existingCart.length; i++){
			let item = Object.assign({}, existingCart[i]);
			hash[item.item_id] = item;
		}

		for(let i=0; i<updateCart.length; i++){
			let item = updateCart[i];
			if(hash[item.item_id]){
				item.image = hash[item.item_id].image || ''
			}
			updatedCart.push(item)
		}

		return {...state, cart:updatedCart}

	


	default:
		return state;
	}
}