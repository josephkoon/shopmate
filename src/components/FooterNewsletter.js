import React, { Component } from 'react';


class FooterNewsletter extends Component {

	render(){
		return(
			<div className='background-dark-gray' style={{height:'72px', paddingLeft:'30px', paddingRight:'30px', display:'flex', alignItems:'center'}}>
				<div style={{width:'60%', display:'inline-block'}}>
					<span className='topbar'>SUBSCRIBE FOR SHOP NEWS, UPDATES AND SPECIAL OFFERS</span>
				</div>

				<div style={{width:'25%', display:'inline-block'}}>
					<input placeholder='Your e-mail here' className='form-control'/>
				</div>

				<div style={{width:'15%', display:'inline-block'}}>
					<button style={{marginLeft:'15px', display:'inline-block'}} className="btn btn-sm btn-danger">Subscribe</button>
				</div>
			</div>
		);
	}
}


export default FooterNewsletter;
