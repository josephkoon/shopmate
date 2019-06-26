import {
	SET_USER,
	CLEAR_USER,
	UPDATE_CUSTOMER,
} from '../actions/types';


export default function(state={user:null}, action){
	switch(action.type){


	case SET_USER:
		return {...state, user:action.payload};

	case CLEAR_USER:
		return {...state, user:null}

	case UPDATE_CUSTOMER:
		let updateUser = Object.assign({}, state.user)
		updateUser.customer = action.payload

		return {...state, user:updateUser}

	default:
		return state;
	}
}