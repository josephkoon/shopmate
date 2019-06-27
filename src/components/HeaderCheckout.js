import React, { Component } from 'react';



class HeaderCheckout extends Component {


	render(){

		return(
			<div className='background-dark-gray' style={{height:'60px', paddingLeft:'15px', paddingRight:'15px', display:'flex', alignItems:'center'}}>
				<div style={{width:'20%', display:'inline-block'}}>
					<span className='topbar light-gray' style={{fontSize:'24px', fontWeight:'500', letterSpacing:'2px'}}>SHOPMATE</span>
				</div>
			</div>

		);
	}
}




export default HeaderCheckout
