import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class ProductCards extends Component {

	toProduct(parameter){
		this.props.history.push('/product/'+parameter)
	}


	render(){
		let productCards

		if(this.props.products.length > 0){
			productCards = this.props.products.map(product => {
				let thumbnail = "https://backendapi.turing.com/images/products/" + product.thumbnail

				return (
					<div key={product.product_id} className='col-3 text-center link' style={{paddingLeft:'7.5px', paddingRight:'7.5px', paddingBottom:'15px'}} >
						<div onClick={()=>this.toProduct(product.product_id)} className='card-shadow' style={{backgroundColor:'white', height:'320px', padding:'15px'}}>
							<div style={{height:'60%', display:'flex', alignItems:'center', justifyContent:'center'}}>
								<img style={{height:'80%'}} src={thumbnail} alt=""/>
							</div>
					
							<div style={{height:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
								<h3>{product.name}</h3>
							</div>

							<div style={{height:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
								<h4 className='light-gray'>£{product.price}</h4>
							</div>

							<div style={{height:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
								<button className='btn btn-sm btn-danger'>Buy Now</button>
							</div>
						</div>
					</div>
				)
			})
		}


		return(
	     	<div className='row'>
	     		{productCards}
	     	</div>
		);
	}
}


function mapStateToProps(state){
	return { 
		products:state.products.products
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({

	}, dispatch);
};

ProductCards = connect(mapStateToProps, mapDispatchToProps)(ProductCards);
export default withRouter(ProductCards);


