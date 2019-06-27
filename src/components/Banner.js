import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { 

} from '../actions/index';

import modal4 from '../images/modal4.png'


class Banner extends Component {

	render(){
		let categoryLabels;

		if(this.props.categories.length > 0){
			categoryLabels = this.props.categories.map(category => {
				return (
					<div key={category.category_id} className='col-4'>
						<h3 className='white'>{category.name}</h3>
					</div>
				)
			});
		}

		return(
	     	<div style={{position:'relative', display:'flex', alignItems:'center', height:'300px'}}>
	     		<div style={{left:'0', position:'absolute', width:'100%', padding:'60px'}}>
	     			<div>
	     				<h1>Mens wear</h1>
	     			</div>

	     			<div className='row' style={{width:'80%'}}>
		     			{categoryLabels}
	     			</div>
	     		</div>

	     		<div style={{width:'100%', height:'100%', overflow:'hidden'}}>
	     			<img style={{width:'100%'}} src={modal4} alt=""/>
	     		</div>
	     	</div>
		);
	}
}


function mapStateToProps(state){
	return { 
		categories:state.categories.categories
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		
	}, dispatch);
};

Banner = connect(mapStateToProps, mapDispatchToProps)(Banner);
export default withRouter(Banner);





