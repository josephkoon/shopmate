import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { 

} from './actions/index';


var stripe = window.Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
var elements = stripe.elements();


class CheckoutForm extends Component {
	constructor(){
		super()

		this.state = {
			token:null,
		}
	}


	setupForm(){

		var style = {
		  base: {
		    // Add your base input styles here. For example:
		    fontSize: '16px',
		    color: "#32325d",
		  }
		};
		// Create an instance of the card Element.
		var card = elements.create('card', {style: style});
		// Add an instance of the card Element into the `card-element` <div>.
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
					console.log('result', result.error)
					var errorElement = document.getElementById('card-errors');
					errorElement.textContent = result.error.message;
				} else {
					// Send the token to your server.
					console.log(result.token)
					//this.stripeTokenHandler(result.token);
					this.setState({token:result.token})
				}
			}.bind(this));
		}.bind(this));
	}


	componentDidMount(){

		setTimeout(() => {
		  this.setupForm()
		}, 2000);

	}



	// stripeTokenHandler(token) {
	//   // Insert the token ID into the form so it gets submitted to the server
	//   // var form = document.getElementById('payment-form');
	//   // var hiddenInput = document.createElement('input');
	//   // hiddenInput.setAttribute('type', 'hidden');
	//   // hiddenInput.setAttribute('name', 'stripeToken');
	//   // hiddenInput.setAttribute('value', token.id);
	//   // form.appendChild(hiddenInput);

	//   // // Submit the form
	//   // form.submit();
	// }




	render(){

		return(
			<form id="payment-form">
			  <div>
			    <div className='form-control' id="card-element">
			    </div>

			    <div id="card-errors" role="alert"></div>
			  </div>

			  <button className="btn btn-sm btn-danger">Pay</button>
			</form>
		)
	}
}



function mapStateToProps(state){
	return { 	

	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({

	}, dispatch);
};

CheckoutForm = connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
export default withRouter(CheckoutForm);




