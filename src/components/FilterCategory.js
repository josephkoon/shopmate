import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { 
	getProductsInCategory
} from '../actions/index';


class FilterCategory extends Component {

	filterProducts(id){
		this.props.getProductsInCategory(id);
	}

	render(){
		let categoryLabels;

		if(this.props.categories.length > 0){
			categoryLabels = this.props.categories.map(category => {
				return (
					<div key={category.category_id}>
						<h3 className='link' onClick={() => this.filterProducts(category.category_id)} >{category.name}</h3>
					</div>
				)
			});
		}

		return(
	     	<div className='bottom-shadow' style={{backgroundColor:'white'}}>
	     		<div style={{padding:'15px'}}>
	     			<h3 className='light-gray'>Categories</h3>
	     			{categoryLabels}
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
		getProductsInCategory
	}, dispatch);
};

FilterCategory = connect(mapStateToProps, mapDispatchToProps)(FilterCategory);
export default withRouter(FilterCategory);


