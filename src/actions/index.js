import {
	SET_USER,
	CLEAR_USER,
	UPDATE_CUSTOMER,

	SET_AUTH_ERROR,
	CLEAR_AUTH_ERROR,

	GET_PRODUCTS,
	GET_PRODUCT,
	GET_PRODUCT_REVIEWS,
	GET_PRODUCT_ATTRIBUTES,

	GET_CATEGORIES,
	GET_DEPARTMENTS,

	SETUP_CART,
	GET_CART,
	UPDATE_CART,
	GET_CART_TOTAL,
	EMPTY_CART,

	GET_SHIPPING_REGIONS,
	GET_SHIPPING_OPTIONS,
	GET_TAXES,

	SET_ORDER,
} from './types'

import axios from 'axios';

const ROOT_URL = 'https://backendapi.turing.com'




export function register(name, email, password){
	return async function(dispatch){
		try {

			const user = await axios.post(ROOT_URL+'/customers', {name:name, email: email, password: password});

			return dispatch(set_User(user.data));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					return dispatch(set_AuthError(error.response.data.error))
				}
			//For other types of error, just display error
			} else if(error){
				console.log('ERROR')
			}
		}
	};
}



export function login(email, password){
	return async function(dispatch){
		try {

			const user = await axios.post(ROOT_URL+'/customers/login', {email: email, password: password});

			return dispatch(set_User(user.data));

		} catch(error){
			//If server returns error, show response
			if(error.response){
				if(error.response.data){
					return dispatch(set_AuthError(error.response.data.error))
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

export function set_AuthError(error){
	return {
		type:SET_AUTH_ERROR,
		payload:error
	};
}

export function clearAuthError(){
	return {
		type:CLEAR_AUTH_ERROR
	};
}

export function logout(){
	return {
		type:CLEAR_USER,
	};
}





export function setupCart(){
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
	return async function(dispatch){
		try {

			const cart = await axios.post(ROOT_URL+'/shoppingcart/add', {cart_id:cart_id, product_id:product_id, attributes:attributes});

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
 
export function get_Cart(cart){
	return {
		type:GET_CART,
		payload:cart
	};
}



export function emptyCart(cart_id){
	return async function(dispatch){
		try {
		
			await axios.delete(ROOT_URL+'/shoppingcart/empty/'+cart_id);

			return dispatch(empty_Cart());

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
 
export function empty_Cart(){
	return {
		type:EMPTY_CART,
	};
}





export function getCartTotal(cart_id){
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





export function getProducts(page){
	return async function(dispatch){
		try {

			//page - defauls to 1
			//limit - defaults to 20
			//description_length - defaults to 200

			let parameter = ""
			if(page){
				parameter = '/?page=' + page
			}

			const products = await axios.get(ROOT_URL+'/products' + parameter);

			return dispatch(get_Products(products.data));

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



export function getProductsInDepartment(id, page){
	return async function(dispatch){
		try {

			//page - defauls to 1
			//limit - defaults to 20
			//description_length - defaults to 200

			let parameter = ""
			if(page){
				parameter = '/?page=' + page
			}

			const products = await axios.get(ROOT_URL+'/products/inDepartment/'+id + parameter);

			return dispatch(get_Products(products.data));

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
	return async function(dispatch){
		try {

			//page - defauls to 1
			//limit - defaults to 20
			//description_length - defaults to 200

			const products = await axios.get(ROOT_URL+'/products/inCategory/'+id);

			return dispatch(get_Products(products.data));

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




export function searchProducts(query){
	return async function(dispatch){
		try {

			//query_string - to search
			//all_words - all words on/off
			//page - defauls to 1
			//limit - defaults to 20
			//description_length - defaults to 200

			const products = await axios.get(ROOT_URL+"/products/search?query_string=" + query);

			return dispatch(get_Products(products.data));

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







export function getCategories(){
	return async function(dispatch){
		try {

			//order - category_id or name
			//page - defauls to 1
			//limit - defaults to 20

			const categories = await axios.get(ROOT_URL+'/categories');

			//let count = categories.data.count
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
	return async function(dispatch){
		try {

			const regions = await axios.get(ROOT_URL+'/shipping/regions/');

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
	return async function(dispatch){
		try {

			var headers = {
			    'user-key': token, 
			}

			let data = {
				cart_id:cart_id, 
				shipping_id:shipping_id, 
				tax_id:tax_id
			};

			const order = await axios.post(ROOT_URL+'/orders', data, {headers:headers} );
			
			return dispatch(set_Order(order.data));

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


export function set_Order(order){
	return {
		type:SET_ORDER,
		payload:order
	};
}






export function chargeStripe(stripeToken, order_id, description, amount, token){
	//dispatch any actions with redux thunk
	return async function(dispatch){
		try {

			var headers = {
			    'user-key': token, 
			}

			let data = {
				stripeToken,
				order_id,
				description,
				amount,
			};

			const charge = await axios.post(ROOT_URL+'/stripe/charge', data, {headers:headers} );

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






export function updateQuantity(item_id, quantity){
	return async function(dispatch){
		try {

			let data = {
				item_id:item_id,
				quantity:quantity,
			};

			const cart = await axios.put(ROOT_URL+'/shoppingCart/update/'+item_id, data );

			console.log('cart', cart)
			dispatch(update_Cart(cart.data))


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


export function update_Cart(cart){
	return {
		type:UPDATE_CART,
		payload:cart
	};
}








export function updateCustomer(name, email, token){
	return async function(dispatch){
		try {

			var headers = {
			    'user-key': token, 
			}

			let data = {
				name:name,
				email:email,
			};

			const customer = await axios.put(ROOT_URL+'/customer', data, {headers:headers} );

			return dispatch(update_Customer(customer.data));

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

export function update_Customer(customer){
	return {
		type:UPDATE_CUSTOMER,
		payload:customer
	};
}



//NOT USED - UPDATE CUSTOMER ADDRESS
// export function updateCustomerAddress(token){
// 	//dispatch any actions with redux thunk
// 	return async function(dispatch){
// 		try {

// 			var headers = {
// 			    'user-key': token, 
// 			}

// 			let data = {
// 				address_1:'test address1',
// 				address_2:'test address2',
// 				city:'test city',
// 				region:'test region',
// 				postal_code:'test postalcode',
// 				country:'test country',
// 				shipping_region_id:1
// 			};

// 			const customer = await axios.put(ROOT_URL+'/customers/address', data, {headers:headers} );

// 			console.log('customer', customer)
// 			return dispatch(update_Customer(customer.data));

// 		} catch(error){
// 			//If server returns error, show response
// 			if(error.response){
// 				if(error.response.data){
// 					console.log('ERROR', error.response.data)
// 				}
// 			//For other types of error, just display error
// 			} else if(error){
// 				console.log('ERROR')
// 			}
// 		}
// 	};
// }





