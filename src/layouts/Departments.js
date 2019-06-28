import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header'
import HeaderNavigation from '../components/HeaderNavigation'
import Footer from '../components/Footer'
import ProductCards from '../components/ProductCards'

import { 
	getCategoriesInDepartment,
	getProductsInDepartment,
} from '../actions/index';

import back from '../icon/icons-back-big-white.png'
import forward from '../icon/icons-forward-big-white.png'


class Departments extends Component {
	constructor(){
		super()

		this.state = {
			page:1,
			department_id:null
		}
	}


	componentDidMount(){
		window.scrollTo(0, 0)
		
		//Load department
		let department_id = this.props.match.params.id;
		let page = 1
		this.setState({department_id:department_id, page:page})
		
		this.props.getProductsInDepartment(department_id, page)
		//this.props.getCategoriesInDepartment(param)
	}


	componentDidUpdate(prevProps, prevState){
		//Update based on url
		if(prevProps.match !== this.props.match){

			let department_id = this.props.match.params.id;
			let page = 1
			this.setState({department_id:department_id, page:page})

			this.props.getProductsInDepartment(department_id, page)
			//this.props.getCategoriesInDepartment(param)
		}
	}


	async nextPage(){
		let nextPage = this.state.page+1

		await this.props.getProductsInDepartment(this.state.department_id, nextPage);
		this.setState({page:nextPage})
	}


	async prevPage(){
		let prevPage = this.state.page - 1

		await this.props.getProductsInDepartment(this.state.department_id, prevPage);
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
					<h3 className='light-gray'>Browse {this.props.count} Items in Department</h3>
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


		return(
		    <div>
		    	<Header/>
		    	<HeaderNavigation/>

		     	<div className='background-light-gray'>
			     	<div style={containerStyle} className='container'>
			     		{pagination}
				     	<ProductCards/>
			     	</div>
		     	</div>
		     	
		     	<Footer/>
		    </div>
		)
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
		categories:state.categories.categories
	};	
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getCategoriesInDepartment,
		getProductsInDepartment,
	}, dispatch);
};

Departments = connect(mapStateToProps, mapDispatchToProps)(Departments);
export default withRouter(Departments);
