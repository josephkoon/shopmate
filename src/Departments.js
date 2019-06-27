import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from './components/Header'
import HeaderNavigation from './components/HeaderNavigation'
import FilterCategory from './components/FilterCategory'
import Footer from './components/Footer'
import ProductCards from './components/ProductCards'

import { 
	getCategoriesInDepartment,
	getProductsInDepartment,
} from './actions/index';



class Departments extends Component {
	constructor(){
		super()

		this.state = {
			page:1
		}
	}


	componentDidMount(){
		window.scrollTo(0, 0)
		
		let param = this.props.match.params.id;
		this.props.getCategoriesInDepartment(param)
		this.props.getProductsInDepartment(param)
	}


	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps.match !== prevState.match){
			window.scrollTo(0, 0)
			
			let param = nextProps.match.params.id;
			nextProps.getCategoriesInDepartment(param)
			nextProps.getProductsInDepartment(param)
		}

		return null
	}


	render(){
		return(
		    <div>
		    	<Header/>
		    	<HeaderNavigation/>

		     	<div className='background-light-gray'>
			     	<div style={{paddingTop:'15px'}} className='container-fluid'>
			     	<div className='row'>
			     	
				     	<div className='col-3'>
				     		<FilterCategory/>
				     	</div>

				     	<div className='col-9'>
				     		<ProductCards/>
				     	</div>

			     	</div>
			     	</div>
		     	</div>
		     	
		     	<Footer />
		    </div>
		)
	}
}


function mapStateToProps(state){
	return { 

	};	
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getCategoriesInDepartment:getCategoriesInDepartment,
		getProductsInDepartment:getProductsInDepartment,
	}, dispatch);
};

Departments = connect(mapStateToProps, mapDispatchToProps)(Departments);
export default withRouter(Departments);
