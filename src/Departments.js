import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from './components/Header'
import HeaderNavigation from './components/HeaderNavigation'
import Footer from './components/Footer'
import ProductCards from './components/ProductCards'

import { 
	getCategoriesInDepartment,
	getProductsInDepartment,
} from './actions/index';

import back from './icon/icons-back-big-white.png'
import forward from './icon/icons-forward-big-white.png'


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

		await this.props.getProductsInDepartment(this.state.department_id, this.state.page+1);
		this.setState({page:this.state.page+1})
	}


	async prevPage(){
		let prevPage = this.state.page - 1

		await this.props.getProductsInDepartment(this.state.department_id, this.state.page-1);
		this.setState({page:this.state.page-1})
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
				<div style={{float:'left'}}>
					<h3 className='light-gray'>Browse {this.props.count} Items</h3>
				</div>

				<div style={{textAlign:'right'}}>
	     		<div style={{display:'inline-block', width:'60px', textAlign:'center'}}>
		     		{showPrev &&
	     				<span onClick={this.prevPage.bind(this)} style={{cursor:'pointer', height:'60px', width:'60px'}}>
	     					<img style={{width:'32px', backgroundColor:'#2E2E2E', borderRadius:'50%'}} src={back} alt=""/> 
	     				</span> 
	     			}
		     		{!showPrev &&
	     				<span style={{height:'60px', width:'60px'}}>
	     					<img style={{width:'32px', backgroundColor:'lightgray', borderRadius:'50%'}} src={back} alt=""/> 
	     				</span> 
	     			}
	 			</div>
	 			<div style={{display:'inline-block', width:'60px', textAlign:'center'}}>
	 				<h4>Page {this.state.page}</h4> 
	 			</div>
	     		<div style={{display:'inline-block', width:'60px', textAlign:'center'}}>
		     		{showNext &&
	     				<span onClick={this.nextPage.bind(this)} style={{cursor:'pointer', height:'60px', width:'60px'}}>
	     					<img style={{width:'32px', backgroundColor:'#2E2E2E', borderRadius:'50%'}} src={forward} alt=""/> 
	     				</span> 
	     			}
	     			{!showNext &&
	     				<span style={{height:'60px', width:'60px'}}>
	     					<img style={{width:'32px', backgroundColor:'lightgray', borderRadius:'50%'}} src={forward} alt=""/> 
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
			     	<div style={{paddingTop:'15px'}} className='container'>
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
		count:state.products.count,
		categories:state.categories.categories
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
