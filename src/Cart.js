import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from './components/Header'
import HeaderNavigation from './components/HeaderNavigation'

import { 
	getCart,
	removeFromCart,
} from './actions/index';



class Cart extends Component {
	constructor(){
		super()

		this.state = {
	
		}
	}


	toCheckout(parameter){
		this.props.history.push('/checkout')
	}

	toLogin(parameter){
		this.props.history.push('/login')
	}



	componentDidMount(){
		window.scrollTo(0, 0)
	}


	// removeFromCart(cart_id){
	// 	this.props.removeFromCart(cart_id)
	// 	this.props.getCart(cart_id)
	// }


	render(){
		let cartList

		if(this.props.cart.length > 0){
			cartList = this.props.cart.map(item => {
				let image= "https://backendapi.turing.com/images/products/" + item.image

				return (
					<tr key={item.item_id} className="d-flex">
						<td className="col-2">
							<img style={{width:'100%'}} src={image} alt=""/>
						</td>
						<td className="col-5">
							<h6><strong>{item.name}</strong></h6>
							<h6>SKU #{item.product_id}</h6>
						</td>
						<td className="col-2"></td>
						<td className="col-2">{item.quantity}</td>
						<td className="col-1">{item.price}</td>
					</tr>
				);
			})
		} else {
			cartList = (
				<tr className="d-flex">
					<td className="col-12 text-center" style={{paddingTop:'30px', paddingBottom:'30px'}}>
						<span className='light-gray'>Your Cart is Empty</span>
					</td>
				</tr>
			)
		}

		return(
		    <div>
		    	<Header/>
		    	<HeaderNavigation/>

		     	<div style={{paddingTop:'30px', paddingBottom:'30px'}} className='container'>
			     	<h2><span class="badge badge-pill badge-danger">{this.props.cart.length} Items</span> In Cart</h2>

			     	<div style={{paddingTop:'30px', paddingBottom:'30px'}}>
					<table className="table table-borderless" >
						<thead style={{borderTop:'1px solid lightgray', borderBottom:'1px solid lightgray'}}>
							<tr className="d-flex">
								<th className="col-2">Item</th>
								<th className="col-5"></th>
								<th className="col-2">Size</th>
								<th className="col-2">Quantity</th>
								<th className="col-1">Price</th>
							</tr>
						</thead>
						<tbody style={{borderBottom:'1px solid lightgray'}}>
							{cartList}
						</tbody>
					</table>
					</div>

					{this.props.cart.length > 0 && this.props.user &&
						<button onClick={this.toCheckout.bind(this)} className='btn btn-lg btn-danger'>Checkout</button>
					}
					{this.props.cart.length > 0 && !this.props.user &&
						<h3><span className='link pink' onClick={this.toLogin.bind(this)}>Login</span> to Checkout</h3>
					}
				</div>
		    </div>
		)
	}
}


function mapStateToProps(state){
	return { 	
		cart_id:state.cart.cart_id,
		cart:state.cart.cart,
		user:state.user.user,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getCart:getCart,
		removeFromCart:removeFromCart,
	}, dispatch);
};

Cart = connect(mapStateToProps, mapDispatchToProps)(Cart);
export default withRouter(Cart);


