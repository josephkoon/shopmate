import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from './Header'
import HeaderNavigation from './HeaderNavigation'

import { 
	login
} from '../actions/index';


class Login extends Component {
	constructor(){
		super()

		this.state = {
			email:null,
			password:null,
		}
	}


	login(){
		this.props.login(this.state.email, this.state.password);
	}


	handleInputChange(event) {
		const value = event.target.value;
		const name = event.target.name;

		this.setState({
			[name]: value
		});
	}


	render(){

		let loginError;
		let loginErrorField;
		if(this.props.loginError){
			loginError = this.props.loginError.message;
			loginErrorField = this.props.loginError.field;
		}

		return(
		    <div>
		    	<Header/>
		    	<HeaderNavigation/>

		    	<div style={{paddingTop:'30px'}} className='offset-4 col-4'>
			    	<h3>Login</h3>

			    	<div style={{paddingTop:'15px', paddingBottom:'15px'}}>
						<div className="form-group">
							<h4>Email</h4>
							<input onChange={this.handleInputChange.bind(this)} type="email" name="email" className="form-control" placeholder="Email" />
						</div>
						<div className="form-group">
							<h4>Password</h4>
							<input onChange={this.handleInputChange.bind(this)} type="password" name="password" className="form-control" placeholder="Password" />
						</div>
					</div>

					<button onClick={this.login.bind(this)} className="btn btn-sm btn-danger">Login</button>
					
					<div style={{paddingTop:'15px', paddingBottom:'15px'}}>
						<h4 className='pink'>{loginError}</h4>
						<h4 className='pink'>{loginErrorField}</h4>
					</div>
				</div>

		    </div>	
		)
	}
}


function mapStateToProps(state){
	return { 
		loginError:state.errors.loginError
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		login
	}, dispatch);
};

Login = connect(mapStateToProps, mapDispatchToProps)(Login);
export default withRouter(Login);
