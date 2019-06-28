import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header'
import HeaderNavigation from '../components/HeaderNavigation'
import Banner from '../components/Banner'
import BannerSub from '../components/BannerSub'
import Footer from '../components/Footer'
import ProductCards from '../components/ProductCards'
import FooterNewsletter from '../components/FooterNewsletter'

import back from '../icon/icons-back-big-white.png'
import forward from '../icon/icons-forward-big-white.png'

import { 
	getProducts,
} from '../actions/index';


class Home extends Component {
	constructor(){
		super()

		this.state = {
			shouldRender:false,
			page:1
		}
	}

	async componentDidMount(){
		window.scrollTo(0, 0);
		
		await this.props.getProducts();
		this.setState({shouldRender:true});
	}


	async nextPage(){
		let nextPage = this.state.page + 1

		await this.props.getProducts(nextPage);
		this.setState({page:nextPage})
	}


	async prevPage(){
		let prevPage = this.state.page - 1

		await this.props.getProducts(prevPage);
		this.setState({page:prevPage})
	}



	render(){

		let showNext = true
		if(this.state.page*20 > this.props.count){
			showNext = false
		}

		let showPrev = false
		if(this.state.page > 1){
			showPrev = true
		}

		let pagination
		pagination = (
			<div style={{paddingBottom:'7.5px'}}>
				<div style={{width:'50%', display:'inline-block'}}>
					<h3 className='light-gray'>Browse {this.props.count} Items</h3>
				</div>

				<div style={{width:'50%', display:'inline-block', textAlign:'right'}}>
	     		<div style={{display:'inline-block', width:'60px', textAlign:'center'}}>
		     		{showPrev &&
	     				<span onClick={this.prevPage.bind(this)} style={{cursor:'pointer', height:'60px', width:'60px'}}>
	     					<img style={blackArrowStyle} src={back} alt=""/> 
	     				</span> 
	     			}
		     		{!showPrev &&
	     				<span style={{height:'60px', width:'60px'}}>
	     					<img style={grayArrowStyle} src={back} alt=""/> 
	     				</span> 
	     			}
	 			</div>
	 			<div style={{display:'inline-block', width:'50px', textAlign:'center'}}>
	 				<h4>Page {this.state.page}</h4> 
	 			</div>
	     		<div style={{display:'inline-block', width:'60px', textAlign:'center'}}>
		     		{showNext &&
	     				<span onClick={this.nextPage.bind(this)} style={{cursor:'pointer', height:'60px', width:'60px'}}>
	     					<img style={blackArrowStyle} src={forward} alt=""/> 
	     				</span> 
	     			}
	     			{!showNext &&
	     				<span style={{height:'60px', width:'60px'}}>
	     					<img style={grayArrowStyle} src={forward} alt=""/> 
	     				</span> 
	     			}
	 			</div>
	 			</div>
 			</div>
		)


		if(this.state.shouldRender){
			return(
			    <div>
			    	<Header/>
			    	<HeaderNavigation/>

			     	<div className='background-light-gray'>
			     		<div style={{paddingTop:'15px'}} className='container-fluid'>
				     		<Banner/>
				     	</div>

				     	<div style={containerStyle} className='container'>
				     		{pagination}
					     	<ProductCards/>
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
			return (<div></div>)
		}

	}
}


const containerStyle = {
	minHeight:'80vh', 
	paddingTop:'15px', 
	paddingBottom:'15px'
}

const blackArrowStyle = {
	width:'32px', 
	backgroundColor:'#2E2E2E', 
	borderRadius:'50%'
}

const grayArrowStyle = {
	width:'32px', 
	backgroundColor:'lightgray', 
	borderRadius:'50%'
}


function mapStateToProps(state){
	return { 
		count:state.products.count,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getProducts,
	}, dispatch);
};

Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default withRouter(Home);






