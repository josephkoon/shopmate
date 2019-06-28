import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from './Header'
import HeaderNavigation from './HeaderNavigation'

import { 
	register,
	clearAuthError,
} from '../actions/index';


class Register extends Component {
	constructor(){
		super()

		this.state = {
			name:null,
			email:null,
			password:null,
		}
	}


	componentWillUnmount(){
		this.props.clearAuthError()
	}

	async register(){
		await this.props.register(this.state.name, this.state.email, this.state.password)

		if(this.props.user){
			this.props.history.push('/');
		}
	}


	handleInputChange(event) {
		const value = event.target.value;
		const name = event.target.name;

		this.setState({
			[name]: value
		});
	}


	toLogin(){
		this.props.history.push('/login');
	}


	render(){
		let registrationError;
		let fieldError;
		if(this.props.authError){
			registrationError = this.props.authError.message;
			fieldError = this.props.authError.field;
		}
		

		return(
		    <div>
		    	<Header/>
		    	<HeaderNavigation/>

		    	<div style={{paddingTop:'45px'}} className='col-12 offset-md-4 col-md-4'>
		    		<div className='box-shadow' style={{padding:'30px', borderRadius:'4px', border:'1px solid lightgray'}}>
			    	<h2>Register</h2>
			    	
			    	<div style={{paddingTop:'15px', paddingBottom:'15px'}}>
						<div className="form-group">
							<h4>Name</h4>
							<input onChange={this.handleInputChange.bind(this)} type="text" name="name" className="form-control" placeholder="Name" />
						</div>

						<div className="form-group">
							<h4>Email</h4>
							<input onChange={this.handleInputChange.bind(this)} type="email" name="email" className="form-control" placeholder="Email" />
						</div>

						<div className="form-group">
							<h4>Password</h4>
							<input onChange={this.handleInputChange.bind(this)} type="password" name="password" className="form-control" placeholder="Password" />
						</div>
					</div>

					<button onClick={this.register.bind(this)} className="btn btn-sm btn-danger">Register</button>

					<div style={{paddingTop:'30px'}}>
						<h4 className='pink'>{registrationError}</h4>
						<h4 className='pink'>{fieldError}</h4>

						<span>Already have an account? <span onClick={this.toLogin.bind(this)} className='link pink'>Login</span></span>
					</div>
					</div>
				</div>
		    </div>	
		)
	}
}


function mapStateToProps(state){
	return { 
		authError:state.errors.authError
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		register,
		clearAuthError,
	}, dispatch);
};

Register = connect(mapStateToProps, mapDispatchToProps)(Register);
export default withRouter(Register);



