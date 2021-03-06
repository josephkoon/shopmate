import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header'
import HeaderNavigation from '../components/HeaderNavigation'

import { 
	getCart,
	emptyCart,
	updateQuantity,
} from '../actions/index';



class Cart extends Component {

	componentDidMount(){
		window.scrollTo(0, 0)
	}


	toCheckout(parameter){
		this.props.history.push('/checkout')
	}

	toLogin(parameter){
		this.props.history.push('/login')
	}

	emptyCart(){
		this.props.emptyCart(this.props.cart_id)
	}


	minusQuantity(item){
		if(item.quantity > 1){
			let quantity = item.quantity - 1
			this.props.updateQuantity(item.item_id, quantity)
		}
		
	}


	addQuantity(item){
		let quantity = item.quantity + 1
		this.props.updateQuantity(item.item_id, quantity)
	}




	render(){
		let cartList

		console.log(this.props.cart)

		//Render cart items
		if(this.props.cart.length > 0){
			cartList = this.props.cart.map(item => {
				let image= "https://backendapi.turing.com/images/products/" + item.image

				return (
					<tr key={item.item_id} className="d-flex">

						<td className="col-2">
							<img style={{width:'80%'}} src={image} alt=""/>
						</td>

						<td className="col-4">
							<h6><strong>{item.name}</strong></h6>
							<h6 className='light-gray'>SKU #{item.product_id}</h6>
						</td>
						<td className="col-2">{item.attributes}</td>

						<td className="col-2">
		     				<span style={{lineHeight:'30px', display:'inline-block', width:'30px', height:'30px', cursor:'pointer', textAlign:'center', fontSize:'24px'}} onClick={() => this.minusQuantity(item)}>
		     					<strong>-</strong>
		     				</span> 
		     				
		     				<div style={{lineHeight:'30px', display:'inline-block', width:'30px', textAlign:'center'}}>
								<span>{item.quantity}</span>
							</div>

		     				<span style={{lineHeight:'30px', display:'inline-block', width:'30px', height:'30px', cursor:'pointer', textAlign:'center', fontSize:'24px'}} onClick={() => this.addQuantity(item)}>
		     					<strong>+</strong>
		     				</span> 
						</td>

						<td className="col-2"><strong>${item.subtotal}</strong></td>
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

		    	<div style={{paddingTop:'30px'}} className='col-12 offset-sm-1 col-sm-10'>
			     	<h2>{this.props.cart.length} Items In Cart</h2>

			     	<div style={{paddingTop:'15px', paddingBottom:'15px'}}>
					<table className="table table-borderless" >
						<thead style={tableHeaderStyle}>
							<tr className="d-flex">
								<th className="col-2 light-gray">Item</th>
								<th className="col-4 light-gray"></th>
								<th className="col-2 light-gray">Details</th>
								<th className="col-2 light-gray">Quantity</th>
								<th className="col-2 light-gray">Price</th>
							</tr>
						</thead>
						<tbody style={{borderBottom:'1px solid lightgray'}}>
							{cartList}
						</tbody>
					</table>
					</div>

					<div>
						{this.props.cart.length > 0 && this.props.user &&
							<button onClick={this.toCheckout.bind(this)} className='float-left btn btn-lg btn-danger'>Checkout</button>
						}
						{!this.props.user &&
							<h2 className='float-left'><span className='link pink' onClick={this.toLogin.bind(this)}>Login </span> to Checkout</h2>
						}

						{this.props.cart.length > 0 &&
							<h4 className='float-right'><span className='link pink' onClick={this.emptyCart.bind(this)}>EMPTY CART</span></h4>
						}
					</div>

				</div>
		    </div>
		)
	}
}




const tableHeaderStyle = {
	borderTop:'1px solid lightgray', 
	borderBottom:'1px solid lightgray'
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
		getCart,
		emptyCart,
		updateQuantity,
	}, dispatch);
};

Cart = connect(mapStateToProps, mapDispatchToProps)(Cart);
export default withRouter(Cart);


