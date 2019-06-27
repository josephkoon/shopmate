import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from './components/Header';
import HeaderNavigation from './components/HeaderNavigation';
import ProductCards from './components/ProductCards';
import Footer from './components/Footer';

import { 
	searchProducts
} from './actions/index';

import querystring from 'query-string'


class Browse extends Component {
	constructor(){
		super()

		this.state = {
	
		}
	}


	componentDidMount(){
		window.scrollTo(0, 0)
		
		//Search products by query
		let query = querystring.parse(this.props.location.search)
		if(query.q){
			this.props.searchProducts(query.q)
		}
	}



	componentDidUpdate(prevProps, prevState){

		//Updated query
		if(prevProps.location.search !== this.props.location.search){
			let query = querystring.parse(this.props.location.search)
			if(query.q){
				this.props.searchProducts(query.q)
			}
		}

	}



	render(){

		// let categoryLabels;

		// if(this.props.categories.length > 0){
		// 	categoryLabels = this.props.categories.map(category => {
		// 		return (
		// 			<div style={{paddingLeft:'15px'}} key={category.category_id}>
		// 				<h3 className='link'>{category.name}</h3>
		// 			</div>
		// 		)
		// 	});
		// }


		return(
		    <div>
		    	<Header/>
		    	<HeaderNavigation/>

		     	<div className='background-light-gray'>
			     	<div style={{paddingTop:'30px'}} className='container'>

			     		
				     	<ProductCards/>

			     	</div>
		     	</div>
		     	
		     	<Footer/>
		    </div>
		)
	}
}



function mapStateToProps(state){
	return { 	
		categories:state.categories.categories,
		count:state.products.count,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		searchProducts,
	}, dispatch);
};

Browse = connect(mapStateToProps, mapDispatchToProps)(Browse);
export default withRouter(Browse);
