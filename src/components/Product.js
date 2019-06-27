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
			selectedSize:'',
			selectedColor:'',
			addedToCart:false,
		}
	}


	async componentDidMount(){
		window.scrollTo(0, 0)

		let productID = this.props.match.params.id

		await this.props.getProduct(productID);
		await this.props.getProductReviews(productID);
		await this.props.getProductAttributes(productID);


		console.log(this.props.attributes)

		if(this.props.attributes.length > 0){
			let attributes = this.props.attributes;
			let initialColor
			for(let i=0; i<attributes.length; i++){
				if(attributes[i].attribute_name == 'Color'){
					initialColor = attributes[i].attribute_value
					break
				}
			}

			let initialSize
			for(let i=0; i<attributes.length; i++){
				if(attributes[i].attribute_name == 'Size'){
					initialSize = attributes[i].attribute_value
					break
				}
			}

			this.setState({selectedSize:initialSize, selectedColor:initialColor})
		}


	}



	selectSize(e){
		let value = e.target.value
		this.setState({selectedSize:value});
	}

	selectColor(e){
		let value = e.target.value
		this.setState({selectedColor:value});
	}

	addToCart(cart_id, product_id){
		let attributes = []

		if(this.state.selectedSize){
			attributes.push(this.state.selectedSize)
		}
		if(this.state.selectedColor){
			attributes.push(this.state.selectedColor)
		}

		attributes = attributes.join(", ")

		//NEEDS ATTRIBUTES
		this.props.addToCart(cart_id, product_id, attributes)
		this.setState({addedToCart:true})
	}


	toCart(parameter){
		this.props.history.push('/cart');
	}



	render(){
		let product

		console.log(this.state)

		if(this.props.product){
			let image= "https://backendapi.turing.com/images/products/" + this.props.product.image
			let image2= "https://backendapi.turing.com/images/products/" + this.props.product.image_2
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
					<option value={color.attribute_value} key={color.attribute_value_id} className="dropdown-item">{color.attribute_value}</option>
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
					<option value={size.attribute_value} key={size.attribute_value_id} className="dropdown-item">{size.attribute_value}</option>
				)
			})


			product = (
	     		<div className='row'>

	     			<div className='col-6 text-center'>
	     				<div>
	     					<img src={image} style={{margin:'15px', width:'60%'}} alt=""/>
	     				</div>
	     				<div>
	     					<img src={image} className='thumbnail-crop' alt=""/>
	     					<img src={image2} className='thumbnail-crop' alt=""/>
	     				</div>
	     			</div>

	     			<div className='col-6'>
	     				<div style={{padding:'15px'}}>
	     					<h4 className='light-gray'>Home / </h4>
	     					<h2>{this.props.product.name}</h2>
	     					<h2 className='pink'>£{this.props.product.price}</h2>
	     				</div>

					    <div style={{padding:'15px'}}>
						    <h3 className='light-gray'>Color</h3>
							<select value={this.state.selectedColor} onChange={this.selectColor.bind(this)} className="form-control">
								{colorOptions}
							</select>
						</div>

				    	<div style={{padding:'15px'}}>
						    <h3 className='light-gray'>Size</h3>
							<select value={this.state.selectedSize} onChange={this.selectSize.bind(this)} className="form-control">
								{sizeOptions}
							</select>
						</div>

	     				<div style={{padding:'15px'}}>
	     					{!this.state.addedToCart &&
	     						<button onClick={() => this.addToCart(cart_id, product_id)} className="btn btn-lg btn-danger">Add to Cart</button>
	     					}
	     					{this.state.addedToCart &&
	     						<div style={{height:'42px'}}>
	     							<h3>Added to Cart! <span onClick={this.toCart.bind(this)} className='link pink'> View Cart</span></h3>
	     						</div>
	     					}
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
					stars.push(<img key={uuidv4()} style={{width:'12px'}} src={starGold} alt=""/>)
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
		     
		     		<div className='box-shadow'>
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


