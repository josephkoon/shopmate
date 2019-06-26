import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from './components/Header'
import HeaderNavigation from './components/HeaderNavigation'
import Banner from './components/Banner'
import BannerSub from './components/BannerSub'
import Filter from './components/Filter'
import Footer from './components/Footer'
import ProductCards from './components/ProductCards'
import FooterNewsletter from './components/FooterNewsletter'


import { 
	getProducts,
	getCategories,
} from './actions/index';



class Home extends Component {
	constructor(){
		super()

		this.state = {
			shouldRender:false
		}
	}


	async componentDidMount(){
		window.scrollTo(0, 0);
		
		await this.props.getProducts();
		await this.props.getCategories();

		this.setState({shouldRender:true});
	}



	render(){
		if(this.state.shouldRender){
			return(
			    <div>
			    	<Header/>
			    	<HeaderNavigation/>

			     	<div className='background-light-gray'>
			     		<div style={{paddingTop:'15px'}} className='container-fluid'>
				     		<Banner/>
				     	</div>

				     	<div style={{paddingTop:'15px'}} className='container-fluid'>
				     	<div className='row'>
					     	<div className='col-3'>
					     		<Filter/>
					     	</div>

					     	<div className='col-9'>
					     		<ProductCards/>
					     	</div>
				     	</div>
				     	</div>
				     
				     	<div style={{paddingBottom:'15px'}} className='container-fluid'>
				     		<BannerSub/>
				     	</div>
			     	</div>
			     	
			     	<FooterNewsletter />
			     	<Footer />
			    </div>
			)
		} else {
			return (<div>Not Loading</div>)
		}

	}
}



function mapStateToProps(state){
	return { 

	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getProducts:getProducts,
		getCategories:getCategories,
	}, dispatch);
};

Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default withRouter(Home);






