import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { 
	getCartTotal,
	logout,
} from '../actions/index';


import bag from '../icon/icons-bag.png'
import flag from '../icon/gbr.png'



class Header extends Component {

	toProfile(){
		this.props.history.push('/profile');
	}

	toRegister(){
		this.props.history.push('/register');
	}

	toLogin(){
		this.props.history.push('/login');
	}

	toCart(){
		this.props.history.push('/cart');
	}

	logout(){
		this.props.logout()
		this.props.history.push('/');
	}



	shouldComponentUpdate(nextProps, nextState){
		//When cart changes, update total
		if(nextProps.cart !== this.props.cart){
			nextProps.getCartTotal(nextProps.cart_id);
		}

		return true
	}



	render(){

		let customerName = "";
		if(this.props.user){
			customerName = this.props.user.customer.name;
		}


		return(
			<div style={{height:'42px', paddingLeft:'15px', paddingRight:'15px', display:'flex', alignItems:'center'}}>
				
				<div style={{width:'20%', display:'inline-block'}}>
					{!customerName &&
					<span className='topbar'>Hi! 
						<span onClick={this.toLogin.bind(this)} className='link pink'> Login </span> or 
						<span onClick={this.toRegister.bind(this)} className='link pink'> Register </span>
					</span>
					}

					{customerName &&
					<span className='topbar'>
						Hi! 

						<div className="dropdown" style={{display:'inline-block'}}>
							<button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className='pink'><strong>{customerName}</strong></span></button>
							<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
								<a className="dropdown-item" onClick={this.toProfile.bind(this)}>Profile</a>
								<a onClick={this.logout.bind(this)} className="dropdown-item">Logout</a>
							</div>
						</div>

					</span>
					}
				</div>

				<div style={{width:'50%'}}>
			
				</div>

				<div style={{width:'15%', display:'inline-block', textAlign:'center'}}>
					<img style={{width:'12px', marginTop:'-2px'}} src={flag} alt=""/>
					<span className='topbar'> £ GBP </span>
				</div>

				<div style={{width:'15%', display:'inline-block', textAlign:'right'}}>
					<span onClick={this.toCart.bind(this)} className='link topbar'>
						<img style={{width:'12px', marginTop:'-2px'}} src={bag} alt=""/>
						<span> Your Cart : </span> 
						<span className='pink'> ${this.props.total || "0"} </span>
					</span>
				</div>
			</div>
		);
	}
}



function mapStateToProps(state){
	return { 
		user:state.user.user,
		cart:state.cart.cart,
		total:state.cart.total,
		cart_id:state.cart.cart_id
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getCartTotal,
		logout,
	}, dispatch);
};

Header = connect(mapStateToProps, mapDispatchToProps)(Header);
export default withRouter(Header);



