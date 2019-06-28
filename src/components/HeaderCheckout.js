import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class HeaderCheckout extends Component {

	toHome(){
		this.props.history.push('/');
	}

	render(){
		return(
			<div className='background-dark-gray' style={containerStyle}>
				<div style={{width:'20%', display:'inline-block'}}>
					<span onClick={this.toHome.bind(this)} className='link topbar light-gray' style={logoStyle} >SHOPMATE</span>
				</div>
			</div>
		);
	}
}

const containerStyle = {
	height:'60px', 
	paddingLeft:'15px', 
	paddingRight:'15px', 
	display:'flex', 
	alignItems:'center'
}

const logoStyle = {
	fontSize:'24px', 
	fontWeight:'500', 
	letterSpacing:'2px'
}


export default withRouter(HeaderCheckout);