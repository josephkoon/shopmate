import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { 
	getShippingRegions,
	getShippingOptions,
	getTaxes,
	createOrder,
	chargeStripe,
} from './actions/index';

import HeaderCheckout from './components/HeaderCheckout'

import rocket from './icon/icons-rocket.png'

var stripe = window.Stripe('pk_test_NcwpaplBCuTL6I0THD44heRe');
var elements = stripe.elements();


class Checkout extends Component {
	constructor(){
		super()

		this.state = {
			selectedRegion:null,
			selectedShipping:null,
			selectedTax:null,

			step:1,
		}
	}


	async componentDidMount(){
		window.scrollTo(0, 0)

		await this.props.getShippingRegions();
		await this.props.getTaxes();

		//Select Tax
		if(this.props.taxes.length > 0){
			this.setState({selectedTax:this.props.taxes[0]})
		}
	}


	stepTwo(){
		this.setState({step:2})
	}

	stepThree(){
		let cart_id = this.props.cart_id;
		let shipping_id = this.state.selectedShipping;
		let tax_id = this.state.selectedTax.tax_id;
		let token

		if(this.props.user){
			token = this.props.user.accessToken
			this.props.createOrder(cart_id, shipping_id, tax_id, token)

			this.setState({step:3})

			//Setup Form
			setTimeout(() => {
			  this.setupForm()
			}, 1000);
		}
	}


	selectRegionOption(e){
		let value = e.target.value
		this.props.getShippingOptions(value)

		this.setState({selectedRegion:value});
	}

	selectShippingOption(e){
		let value = e.target.value

		this.setState({selectedShipping:value});
	}

	toHome(parameter){
		this.props.history.push('/')
	}


	setupForm(){
		var style = {
			  // base: {
			  //   color: '#32325d',
			  //   fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
			  //   fontSmoothing: 'antialiased',
			  //   fontSize: '14px',
			  //   '::placeholder': {
			  //     color: '#aab7c4'
			  //   }
			  // },
			  // invalid: {
			  //   color: '#fa755a',
			  //   iconColor: '#fa755a'
			  // }
		};
		// Create an instance of the card Element.
		var card = elements.create('card', {style: style});
		card.mount('#card-element');


		//Display Errors
		card.addEventListener('change', function(event) {
			var displayError = document.getElementById('card-errors');
			if (event.error) {
				displayError.textContent = event.error.message;
			} else {
				displayError.textContent = '';
			}
		});


		//Listen for Submit
		var form = document.getElementById('payment-form');
		form.addEventListener('submit', function(event) {
			event.preventDefault();

			stripe.createToken(card).then(function(result) {
				if (result.error) {
					// Inform the customer that there was an error.
					var errorElement = document.getElementById('card-errors');
					errorElement.textContent = result.error.message;
				} else {

					// Send the token to your server.
					let stripeToken = result.token.id;
					let order_id = parseInt(this.props.order.orderId);
					let description = 'test description';
					let amount = parseInt(this.props.total) * 100;
					let token = this.props.user.accessToken;
					this.props.chargeStripe(stripeToken, order_id, description, amount, token)

					this.setState({step:4})

				}
			}.bind(this));
		}.bind(this));
	}




	render(){


		let regions = []
		if(this.props.regions.length > 0){
			regions = this.props.regions.map(region => {
				return (
					<option key={region.shipping_region_id} value={region.shipping_region_id} className="dropdown-item">{region.shipping_region}</option>
				)
			})
		}

		let options = []
		if(this.props.options.length > 0){
			options = this.props.options.map(option => {
				return (
					<option value={option.shipping_id} key={option.shipping_id} className="dropdown-item">{option.shipping_type}</option>
				)
			})
		}


		let displayTax = ""
		if(this.state.selectedTax){
			displayTax = this.state.selectedTax.tax_type;
		}

		let displayCartTotal = ""
		if(this.props.total){
			displayCartTotal = this.props.total;
		}

		let displayShipping = ""
		if(this.state.selectedShipping){
			for(let i=0; i<this.props.options.length; i++){
				if(this.state.selectedShipping == this.props.options[i].shipping_id){
					displayShipping = this.props.options[i].shipping_type
				}
			}
		}



		return(
			<div>
			<HeaderCheckout/>

		    <div style={{paddingTop:'30px'}} className='row'>
		    <div className='col-12 offset-md-4 col-md-4'>

		    	{this.state.step == 1 &&
		    	<div className='box-shadow' style={{padding:'30px', borderRadius:'4px', border:'1px solid lightgray'}}>
		    		<div style={{padding:'15px'}}>
				    	<h2>Delivery</h2>
						<div className="progress">
							<div className="progress-bar bg-danger" role="progressbar" style={{width:'0%'}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<hr/>
					</div>

				    <div style={{padding:'15px'}}>
					    <h3 className='light-gray'>Shipping Region</h3>
						<select value={this.state.selectedRegion} onChange={this.selectRegionOption.bind(this)} className="form-control">
							{regions}
						</select>
					</div>

					{this.state.selectedRegion &&
				    <div style={{padding:'15px'}}>
					    <h3 className='light-gray'>Delivery Options</h3>
						<select value={this.state.selectedOption} onChange={this.selectShippingOption.bind(this)} className="form-control">
							{options}
						</select>
					</div>
					}

					<div style={{padding:'15px'}}>
						<hr/>
						{!this.state.selectedShipping &&
							<h4>Select a Region/Shipping Option to Continue</h4>
						}
						{this.state.selectedShipping &&
							<button onClick={this.stepTwo.bind(this)} className="btn btn-sm btn-danger">Next Step</button>
						}
					</div>
				</div>
				}


				{this.state.step == 2 &&
				<div className='box-shadow' style={{padding:'30px', borderRadius:'4px', border:'1px solid lightgray'}}>
					<div style={{padding:'15px'}}>
						<h2>Confirmation</h2>
						<div className="progress">
							<div className="progress-bar bg-danger" role="progressbar" style={{width:'25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<hr/>
					</div>

					<div style={{padding:'15px'}}>
						<h4 className='light-gray'>Cart Total</h4>
						<h3>{displayCartTotal}</h3>
					</div>

					<div style={{padding:'15px'}}>
						<h4 className='light-gray'>Tax</h4>
						<h3>{displayTax}</h3>
					</div>

					<div style={{padding:'15px'}}>
						<h4 className='light-gray'>Shipping</h4>
						<h3>{displayShipping}</h3>
					</div>

					<div style={{padding:'15px'}}>
						<hr/>
						<button onClick={this.stepThree.bind(this)} className="btn btn-sm btn-danger">Next Step</button>
					</div>
				</div>
				}


				{this.state.step == 3 &&
				<div className='box-shadow' style={{padding:'30px', borderRadius:'4px', border:'1px solid lightgray'}}>
					<div style={{padding:'15px'}}>
						<h2>Payment</h2>
						<div className="progress">
							<div className="progress-bar bg-danger" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<hr/>
					</div>

					<form id="payment-form">
						<div className='form-row' style={{padding:'15px'}}>
							<h3 className='light-gray'>Enter Card Information</h3>
							<div style={{padding:'10px', border:'1px solid gray', borderRadius:'10px'}} id="card-element" className="w-100"></div>
							<div id="card-errors" role="alert"></div>
						</div>
						<div style={{padding:'15px'}}>
							<hr/>
							<button className="btn btn-sm btn-danger">Complete Payment</button>
						</div>
					</form>
					
				</div>
				}


				{this.state.step == 4 &&
				<div className='box-shadow' style={{padding:'30px', borderRadius:'4px', border:'1px solid lightgray'}}>
					<div style={{padding:'15px'}}>
						<h2>Thanks !</h2>
						<div className="progress">
							<div className="progress-bar bg-danger" role="progressbar" style={{width:'100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
						<hr/>
					</div>

					<img style={{width:'100%'}} src={rocket} alt=""/> 

					<div style={{padding:'15px'}}>
						<hr/>
						<span onClick={this.toHome.bind(this)} className='link pink'>Return To Shop</span>
					</div>
				</div>
				}

			</div>
		    </div>
		    </div>
		)
	}
}


function mapStateToProps(state){
	return { 	
		total:state.cart.total,
		cart_id:state.cart.cart_id,
		regions:state.orders.regions,
		options:state.orders.options,
		taxes:state.orders.taxes,
		user:state.user.user,
		order:state.orders.order,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getShippingRegions,
		getShippingOptions,
		getTaxes,
		createOrder,
		chargeStripe,
	}, dispatch);
};

Checkout = connect(mapStateToProps, mapDispatchToProps)(Checkout);
export default withRouter(Checkout);



