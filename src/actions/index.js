import {
	GET_PRODUCTS,
	GET_PRODUCT,
	GET_PRODUCT_REVIEWS,
	GET_PRODUCT_ATTRIBUTES,
	SEARCH_PRODUCTS,

	GET_CATEGORIES,

	GET_DEPARTMENTS,

	SET_REGISTRATION_ERROR,
	SET_LOGIN_ERROR,

	SET_USER,
	CLEAR_USER,

	SETUP_CART,
	GET_CART,
	GET_CART_TOTAL,
	ADD_TO_CART,
	REMOVE_FROM_CART,

	GET_SHIPPING_REGIONS,
	GET_SHIPPING_OPTIONS,
	GET_TAXES,
} from './types'

import axios from 'axios';

const ROOT_URL = 'https://backendapi.turing.com'





export function register(name, email, password){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			const user = await axios.post(ROOT_URL+'/customers', {name:name, email: email, password: password});

			console.log('user', user)

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					return dispatch(set_RegistrationError(error.response.data.error))
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};
}

export function set_RegistrationError(error){
	return {
		type:SET_REGISTRATION_ERROR,
		payload:error
	};
}





export function login(email, password){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			const user = await axios.post(ROOT_URL+'/customers/login', {email: email, password: password});

			return dispatch(set_User(user.data));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					return dispatch(set_LoginError(error.response.data.error))
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};
}

export function set_User(user){
	return {
		type:SET_USER,
		payload:user
	};
}

export function set_LoginError(error){
	return {
		type:SET_LOGIN_ERROR,
		payload:error
	};
}



export function logout(){
	return {
		type:CLEAR_USER,
	};
}







export function setupCart(){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			const cart = await axios.get(ROOT_URL+'/shoppingcart/generateUniqueId');

			let cartID = cart.data.cart_id

			return dispatch(setup_Cart(cartID));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};	
}

export function setup_Cart(cart){
	return {
		type:SETUP_CART,
		payload:cart
	};
}





export function getCart(cart_id){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			const cart = await axios.get(ROOT_URL+'/shoppingcart/'+cart_id);

			return dispatch(get_Cart(cart.data));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};	
}


export function addToCart(cart_id, product_id, attributes){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			const cart = await axios.post(ROOT_URL+'/shoppingcart/add', {cart_id:cart_id, product_id:product_id, attributes:attributes});

			console.log('getting new cart', cart.data)

			dispatch(get_Cart(cart.data))

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};	
}
 

export function removeFromCart(item_id){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {
			console.log('item_id', item_id)

			const cart = await axios.delete(ROOT_URL+'/shoppingcart/removeProduct/' + item_id);

			console.log(cart)
			// console.log('getting new cart', cart.data)

			// dispatch(get_Cart(cart.data))

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};	
}

export function get_Cart(cart){
	return {
		type:GET_CART,
		payload:cart
	};
}






export function getCartTotal(cart_id){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			const total = await axios.get(ROOT_URL+'/shoppingcart/totalAmount/'+cart_id);

			return dispatch(get_CartTotal(total.data.total_amount));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};	
}

export function get_CartTotal(total){
	return {
		type:GET_CART_TOTAL,
		payload:total
	};
}







export function getProducts(){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			//page - defauls to 1
			//limit - defaults to 20
			//description_length - defaults to 200

			const products = await axios.get(ROOT_URL+'/products');

			let count = products.data.count
			let rows = products.data.rows

			return dispatch(get_Products(rows));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};
}




export function getProductsInDepartment(id){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			//page - defauls to 1
			//limit - defaults to 20
			//description_length - defaults to 200

			const products = await axios.get(ROOT_URL+'/products/inDepartment/'+id);

			let count = products.data.count
			let rows = products.data.rows

			return dispatch(get_Products(rows));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};
}




export function getProductsInCategory(id){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			//page - defauls to 1
			//limit - defaults to 20
			//description_length - defaults to 200

			const products = await axios.get(ROOT_URL+'/products/inCategory/'+id);

			let count = products.data.count
			let rows = products.data.rows

			return dispatch(get_Products(rows));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};
}

export function get_Products(products){
	return {
		type:GET_PRODUCTS,
		payload:products
	};
}





export function getProduct(id){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			const product = await axios.get(ROOT_URL+'/products/'+id);

			return dispatch(get_Product(product.data));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};
}

export function get_Product(product){
	return {
		type:GET_PRODUCT,
		payload:product
	};
}




export function getProductReviews(id){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			const product = await axios.get(ROOT_URL+'/products/'+id+'/reviews');

			return dispatch(get_ProductReviews(product.data));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};
}

export function get_ProductReviews(reviews){
	return {
		type:GET_PRODUCT_REVIEWS,
		payload:reviews
	};
}



export function getProductAttributes(id){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			const attributes = await axios.get(ROOT_URL+'/attributes/inProduct/'+id);

			return dispatch(get_ProductAttributes(attributes.data));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};
}

export function get_ProductAttributes(attributes){
	return {
		type:GET_PRODUCT_ATTRIBUTES,
		payload:attributes
	};
}




export function searchProducts(query){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			//query_string - to search
			//all_words - all words on/off
			//page - defauls to 1
			//limit - defaults to 20
			//description_length - defaults to 200

			const products = await axios.get(ROOT_URL+"/products/search?query_string=" + query);

			return dispatch(search_Products(products.data));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};
}

export function search_Products(products){
	return {
		type:SEARCH_PRODUCTS,
		payload:products
	};
}






export function getCategories(){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			//order - category_id or name
			//page - defauls to 1
			//limit - defaults to 20

			const categories = await axios.get(ROOT_URL+'/categories');

			let count = categories.data.count
			let rows = categories.data.rows

			return dispatch(get_Categories(rows));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};
}





export function getDepartments(){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			const departments = await axios.get(ROOT_URL+'/departments');

			return dispatch(get_Departments(departments.data));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};
}

export function get_Departments(departments){
	return {
		type:GET_DEPARTMENTS,
		payload:departments
	};
}


export function getCategoriesInDepartment(id){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			const categories = await axios.get(ROOT_URL+'/categories/inDepartment/'+id);

			return dispatch(get_Categories(categories.data));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};
}

export function get_Categories(categories){
	return {
		type:GET_CATEGORIES,
		payload:categories
	};
}







export function getShippingRegions(){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			const regions = await axios.get(ROOT_URL+'/shipping/regions/');

			console.log(regions)

			return dispatch(get_ShippingRegions(regions.data));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};
}

export function get_ShippingRegions(regions){
	return {
		type:GET_SHIPPING_REGIONS,
		payload:regions
	};
}




export function getShippingOptions(region_id){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			const options = await axios.get(ROOT_URL+'/shipping/regions/'+region_id);

			return dispatch(get_ShippingOptions(options.data));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};
}

export function get_ShippingOptions(options){
	return {
		type:GET_SHIPPING_OPTIONS,
		payload:options
	};
}







export function getTaxes(){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			const taxes = await axios.get(ROOT_URL+'/tax');

			return dispatch(get_Taxes(taxes.data));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR')
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};
}

export function get_Taxes(taxes){
	return {
		type:GET_TAXES,
		payload:taxes
	};
}





export function createOrder(cart_id, shipping_id, tax_id, token){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			var headers = {
			    'user-key': token, 
			}

			const order = await axios.post(ROOT_URL+'/orders', {cart_id:cart_id, shipping_id:shipping_id, tax_id:tax_id}, {headers:headers} );

			console.log('order', order)

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					console.log('ERROR', error.response.data)
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};
}











