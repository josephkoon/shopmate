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

	componentDidMount(){
		window.scrollTo(0, 0)
		
		//Search products by query
		let query = querystring.parse(this.props.location.search)
		if(query.q){
			this.props.searchProducts(query.q)
		}
	}


	toHome(){
		this.props.history.push('/');
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

		let pagination
		pagination = (
			<div style={{paddingBottom:'7.5px'}}>
				{this.props.count > 0 &&
					<h3 className='light-gray'>Browse {this.props.count} Results</h3>
				}
				{this.props.count == 0 &&
					<h3 className='light-gray'>No Search Results! <span onClick={this.toHome.bind(this)} className='link pink'>Return Home</span></h3>
				}
 			</div>
		)

		return(
		    <div>
		    	<Header/>
		    	<HeaderNavigation/>

		     	<div className='background-light-gray'>
			     	<div style={{minHeight:'80vh', paddingTop:'15px', paddingBottom:'15px'}} className='container'>
						{pagination}
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




