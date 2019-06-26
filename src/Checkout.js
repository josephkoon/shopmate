import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { 
	getShippingRegions,
	getShippingOptions,
	getTaxes,
	createOrder,
} from './actions/index';


import CheckoutForm from './CheckoutForm'


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
					<option value={option.shipping_id} key={option.shipping_id} className="dropdown-item">{option.shipping_type} - {option.shipping_cost}</option>
				)
			})
		}


		let displayTax = ""
		if(this.state.selectedTax){
			displayTax = this.state.selectedTax.tax_type;
		}

		let displayCart = ""
		if(this.props.cart_id){
			displayCart = this.props.cart_id;
		}

		let displayShipping = ""
		if(this.state.selectedShipping){
			displayShipping = this.state.selectedShipping;
		}



		return(
		    <div className='row'>
		    <div className='col-4 offset-4'>


		    	{this.state.step == 1 &&
		    	<div style={{padding:'30px', borderRadius:'4px', border:'1px solid lightgray'}}>
			    	<h3>Delivery</h3>
				    <div style={{padding:'15px'}}>
					    <h3 className='light-gray'>Shipping Region</h3>
						<select value={this.state.selectedRegion} onChange={this.selectRegionOption.bind(this)} className="form-control">
							{regions}
						</select>
					</div>

				    <div style={{padding:'15px'}}>
					    <h3 className='light-gray'>Delivery Options</h3>
						<select value={this.state.selectedOption} onChange={this.selectShippingOption.bind(this)} className="form-control">
							{options}
						</select>
					</div>
					<button onClick={this.stepTwo.bind(this)} className="btn btn-sm btn-danger">Next Step</button>
				</div>
				}


				{this.state.step == 2 &&
				<div style={{padding:'30px', borderRadius:'4px', border:'1px solid lightgray'}}>
					<h3>Confirmation</h3>
					<h3 className='light-gray'>Cart</h3>
					<h4>{displayCart}</h4>

					<h3 className='light-gray'>Tax</h3>
					<h4>{displayTax}</h4>

					<h3 className='light-gray'>Shipping</h3>
					<h4>{displayShipping}</h4>

					<button onClick={this.stepThree.bind(this)} className="btn btn-sm btn-danger">Next Step</button>
				</div>
				}


				{this.state.step == 3 &&
				<div style={{padding:'30px', borderRadius:'4px', border:'1px solid lightgray'}}>
					<h3>Payment</h3>
				    <div style={{padding:'15px'}}>
						<CheckoutForm/>
					</div>
				</div>
				}


				{this.state.step == 4 &&
				<div style={{padding:'30px', borderRadius:'4px', border:'1px solid lightgray'}}>
					<h3>Finish</h3>
					<button className="btn btn-sm btn-danger">Back To Shop</button>
				</div>
				}


			</div>
		    </div>
		)
	}
}


function mapStateToProps(state){
	return { 	
		cart_id:state.cart.cart_id,
		regions:state.orders.regions,
		options:state.orders.options,
		taxes:state.orders.taxes,
		user:state.user.user,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getShippingRegions,
		getShippingOptions,
		getTaxes,
		createOrder,
	}, dispatch);
};

Checkout = connect(mapStateToProps, mapDispatchToProps)(Checkout);
export default withRouter(Checkout);



