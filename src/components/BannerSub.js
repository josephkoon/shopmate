import React, { Component } from 'react';

import shoe2 from '../images/shoe2.png'

class BannerSub extends Component {
	render(){
		return(
	     	<div style={{position:'relative', display:'flex', alignItems:'center', height:'336px'}}>
	     		<div style={{left:'0', position:'absolute', width:'100%', padding:'60px'}}>
	     			<div>
	     				<h1 className='white'>Converse</h1>
	     			</div>

	     			<div style={{width:'50%'}}>
		     			<h2 className='white'>Explore styles tough enough to handle all your workouts</h2>
	     			</div>

	     			<div style={{paddingTop:'15px'}}>
	     				<button className='btn btn-lg btn-danger'>Shop Brand</button>
	     			</div>
	     		</div>

	     		<div style={{width:'100%', height:'100%', overflow:'hidden'}}>
	     			<img style={{width:'100%'}} src={shoe2} alt=""/>
	     		</div>
	     	</div>
		);
	}
}

export default BannerSub;

