import { combineReducers } from 'redux';

import productsReducer from './products_reducer';
import categoriesReducer from './categories_reducer';
import departmentsReducer from './departments_reducer';
import errorsReducer from './errors_reducer';
import userReducer from './user_reducer';
import cartReducer from './cart_reducer';
import ordersReducer from './orders_reducer';

const rootReducer = combineReducers({
	products:productsReducer,
	categories:categoriesReducer,
	departments:departmentsReducer,
	errors:errorsReducer,
	user:userReducer,
	cart:cartReducer,
	orders:ordersReducer,
});



export default rootReducer;
