import React, { Component } from 'react';

import email from '../icon/icons-email-black.png'


class FooterNewsletter extends Component {
	render(){
		let inputStyle = {
			background:`white url(${email}) no-repeat`,
			backgroundPosition: 'left 10px bottom 8px',
			backgroundSize:'14px',
			paddingLeft:'36px'
		}

		return(
			<div className='background-dark-gray' style={{height:'72px', paddingLeft:'30px', paddingRight:'30px', display:'flex', alignItems:'center'}}>
				<div style={{width:'50%', display:'inline-block'}}>
					<span className='topbar'>SUBSCRIBE FOR SHOP NEWS, UPDATES AND SPECIAL OFFERS</span>
				</div>

				<div style={{width:'30%', display:'inline-block'}}>
					<input style={inputStyle} placeholder='Your e-mail here' className='form-control'/>
				</div>

				<div style={{width:'20%', display:'inline-block'}}>
					<button style={{marginLeft:'7.5px', display:'inline-block'}} className="btn btn-sm btn-danger">Subscribe</button>
				</div>
			</div>
		);
	}
}

export default FooterNewsletter;
