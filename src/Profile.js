import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from './components/Header'
import HeaderNavigation from './components/HeaderNavigation'

import { 
	getCategoriesInDepartment,
	getProductsInDepartment,
} from './actions/index';



class Profile extends Component {
	constructor(){
		super()

		this.state = {
	
		}
	}

	render(){
		let user
		let profile
		
		if(this.props.user){
			user = this.props.user.customer
			profile = (
				<div>
		    		<Header/>
		    		<HeaderNavigation/>
			     	<div className='background-dark-gray'>
			     	<div style={{paddingTop:'15px', paddingBottom:'15px'}} className='container'>
			     		<div style={{padding:'15px'}}>
							<h3>Information</h3>
							<h4>Name {user.name}</h4>
							<h4>Email {user.email}</h4>

							<h4>Phone {user.day_phone}</h4>
							<h4>Mobile {user.mob_phone}</h4>
						</div>
			
						<div style={{padding:'15px'}}>
							<h3>Address</h3>
							<h4>Address 1 {user.address_1}</h4>
							<h4>Address 2 {user.address_2}</h4>
							<h4>City {user.city}</h4>
							<h4>Zipcode {user.postal_code}</h4>
							<h4>Region {user.region}</h4>
							<h4>Region ID {user.shipping_region_id}</h4>
						</div>

						<div style={{padding:'15px'}}>
							<h3>Credit</h3>
							<h4>Credit Card {user.credit_card}</h4>
						</div>
					</div>
					</div>
				</div>
			)
		}

		return(
		    <div>
		    	{profile}
		    </div>
		)
	}
}



function mapStateToProps(state){
	return { 	
		user:state.user.user
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getCategoriesInDepartment:getCategoriesInDepartment,
		getProductsInDepartment:getProductsInDepartment,
	}, dispatch);
};

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default withRouter(Profile);




