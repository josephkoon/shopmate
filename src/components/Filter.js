import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { 

} from '../actions/index';


class Filter extends Component {

	render(){
		return(
	     	<div className='bottom-shadow' style={{backgroundColor:'white'}}>
	     		<div style={{padding:'15px', backgroundColor:'rgb(252,252,252)'}}>
		     		<h3>Filter 486 Items</h3>
	     		</div>

	     		<div style={{padding:'15px'}}>
	     			<h3 className='light-gray'>Color</h3>
	     		</div>

	     		<div style={{padding:'15px'}}>
	     			<h3 className='light-gray'>Size</h3>
	     		</div>

	     		<div style={{padding:'15px', backgroundColor:'rgb(252,252,252)'}}>
	     			<div style={{width:'50%', display:'inline-block', textAlign:'center'}}>
	     				<button className='btn btn-sm btn-danger'>Apply</button>
	     			</div>
	     			<div style={{width:'50%', display:'inline-block', textAlign:'center'}}>
	     				<span className='pink'>Clear All</span>
	     			</div>
	     		</div>
	     	</div>
		);
	}
}


function mapStateToProps(state){
	return { 

	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
	
	}, dispatch);
};

Filter = connect(mapStateToProps, mapDispatchToProps)(Filter);
export default withRouter(Filter);


