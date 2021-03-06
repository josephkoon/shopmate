import React, { Component } from 'react';

import shoe2 from '../images/shoe2.png'

class BannerSub extends Component {
	render(){
		return(
	     	<div style={bannerStyle}>
	     		<div style={bannerContentStyle}>
	     			<div>
	     				<h1 className='white'>Converse</h1>
	     			</div>

	     			<div className='d-none d-sm-block' style={{width:'50%'}}>
		     			<h2 className='white'>Explore styles tough enough to handle all your workouts</h2>
	     			</div>

	     			<div style={{paddingTop:'15px'}}>
	     				<button className='btn btn-lg btn-danger'>Shop Brand</button>
	     			</div>
	     		</div>

	     		<img style={bannerImageStyle} src={shoe2} alt=""/>
	     	</div>
		);
	}
}

const bannerStyle = {
	display:'flex', 
	alignItems:'center', 
	height:'300px', 
	width:'100%',
}

const bannerContentStyle = {
	left:'0', 
	position:'absolute', 
	width:'100%', 
	padding:'60px'
}

const bannerImageStyle = {
	height:'100%', 
	flex:'1', 
	objectFit:'cover', 
	overflow:'hidden'
}

export default BannerSub;



