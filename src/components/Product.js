import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from './Header'
import HeaderNavigation from './HeaderNavigation'
import Footer from './Footer'

import { 
	getProduct,
	getProductReviews,
	getProductAttributes,
	addToCart,
} from '../actions/index';

import starGold from '../icon/icons-star-gold.png'

const uuidv4 = require('uuid/v4');



class Product extends Component {
	constructor(){
		super()

		this.state = {
			
		}
	}


	async componentDidMount(){
		window.scrollTo(0, 0)

		let productID = this.props.match.params.id

		this.props.getProduct(productID);
		this.props.getProductReviews(productID);
		this.props.getProductAttributes(productID);
	}


	addToCart(cart_id, product_id){
		//NEEDS ATTRIBUTES
		this.props.addToCart(cart_id, product_id, '')
	}


	render(){
		let product

		if(this.props.product){
			let image= "https://backendapi.turing.com/images/products/" + this.props.product.image
			let product_id = this.props.product.product_id
			let cart_id = this.props.cart_id
			let attributes = this.props.attributes;


			let colors = []
			for(let i=0; i<attributes.length; i++){
				if(attributes[i].attribute_name == 'Color'){
					colors.push(attributes[i])
				}
			}
			let colorOptions = colors.map(color => {
				return (
					<a key={color.attribute_value_id} className="dropdown-item">{color.attribute_value}</a>
				)
			})


			let sizes = []
			for(let i=0; i<attributes.length; i++){
				if(attributes[i].attribute_name == 'Size'){
					sizes.push(attributes[i])
				}
			}
			let sizeOptions = sizes.map(size => {
				return (
					<a key={size.attribute_value_id} className="dropdown-item">{size.attribute_value}</a>
				)
			})



			product = (
	     		<div className='row'>
	     			<div className='col-6 text-center'>
	     				<img src={image} style={{width:'60%'}} alt=""/>
	     			</div>

	     			<div className='col-6'>
	     				<div style={{padding:'15px'}}>
	     					<h2>{this.props.product.name}</h2>
	     				</div>

	     				<div style={{padding:'15px'}}>
	     					<h2 className='pink'>$ {this.props.product.price}</h2>
	     				</div>

	     				<div style={{padding:'15px'}}>
	     					<h3 className='light-gray'>Color</h3>
							<div className="dropdown">
							  <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							    Select Color
							  </button>
							  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
							    {colorOptions}
							  </div>
							</div>
						</div>

						<div style={{padding:'15px'}}>
	     					<h3 className='light-gray'>Size</h3>
							<div className="dropdown">
							  <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							    Select Size
							  </button>
							  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
							  	{sizeOptions}
							  </div>
							</div>
						</div> 

	     				<div style={{padding:'15px'}}>
	     					<button onClick={() => this.addToCart(cart_id, product_id)} className="btn btn-lg btn-danger">Add to Cart</button>
	     				</div>
	     			</div>
		     	</div>
			)
		}


		let reviews
		if(this.props.reviews.length>0){
			reviews = this.props.reviews.slice(0,10).map(review => {

				let stars = []
				for(let i=0; i<review.rating; i++){
					stars.push(<img key={uuidv4()} style={{width:'12px'}} src={starGold}/>)
				}

				return (
		     		<div key={review.created_on} className='row'>
		     			<div className='col-12'>
		     				<hr/>
		     			</div>
		     			<div className='col-4'>
		     				{stars}

		     				<h4>{review.name}</h4>
		     				<h4 className='light-gray'>{review.created_on}</h4>
		     			</div>
		     			<div className='col-8'>
		     				<p style={{whiteSpace:'pre-wrap'}}>{review.review}</p>
		     			</div>
			     	</div>
				)
			})
		} else {
			reviews = (
	     		<div className='row'>
	     			<div className='col-12'>
	     				<hr/>
	     				No Reviews
	     			</div>
		     	</div>
			)
		}



		return(
		    <div>
		    	<Header/>
		    	<HeaderNavigation/>

		     	<div className='background-dark-gray'>
		     	<div style={{paddingTop:'30px', paddingBottom:'30px'}} className='container'>
		     
		     		<div className='background-white'>
		     		<div style={{padding:'30px'}}>
		     			{product}
		     		</div>
		     		</div>

		     		<div className='background-light-gray'>
		     		<div style={{padding:'30px'}}>
		     			<h3>Product Reviews</h3>
		     			{reviews}
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
		product:state.products.product,
		reviews:state.products.reviews,
		attributes:state.products.attributes,
		cart_id:state.cart.cart_id,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getProduct,
		getProductReviews,
		getProductAttributes,
		addToCart,
	}, dispatch);
};

Product = connect(mapStateToProps, mapDispatchToProps)(Product);
export default withRouter(Product);


