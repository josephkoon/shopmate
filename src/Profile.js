import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from './components/Header'
import HeaderNavigation from './components/HeaderNavigation'

import { 
	updateCustomerAddress,
	updateCustomer,
} from './actions/index';



class Profile extends Component {
	constructor(){
		super()

		this.state = {
			name:"",
			email:"",
		}
	}


	componentDidMount(){
		let email = ""
		let name = ""

		if(this.props.user){
			email = this.props.user.customer.email || ""
			name = this.props.user.customer.name || ""
		}

		this.setState({name, email})
	}


	updateCustomer(){
		let token = this.props.user.accessToken
		this.props.updateCustomer(this.state.name, this.state.email, token)
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
		

			    	<div style={{paddingTop:'30px', paddingBottom:'30px'}} className='offset-4 col-4'>
			    		<div style={{padding:'30px', borderRadius:'4px', border:'1px solid lightgray'}}>
				    		
				    		<h3>Profile Information</h3>
							<div style={{padding:'15px'}}>
								<h4>Name - {user.name}</h4>
								<input className='form-control' type="text" value={this.state.name} onChange={(e) => { this.setState({name: e.target.value }) }} />
							</div>

							<div style={{padding:'15px'}}>
								<h4>Email - {user.email}</h4>
								<input className='form-control' type="text" value={this.state.email} onChange={(e) => { this.setState({email: e.target.value }) }} />
							</div>

							<div style={{padding:'15px'}}>
								<button onClick={this.updateCustomer.bind(this)} className='btn btn-light btn-default'>Update Information</button>
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
		updateCustomerAddress,
		updateCustomer,
	}, dispatch);
};

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default withRouter(Profile);




