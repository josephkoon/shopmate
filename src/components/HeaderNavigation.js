import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { 
	getDepartments
} from '../actions/index'


class HeaderNavigation extends Component {

	toHome(){
		this.props.history.push('/');
	}

	toCatalog(parameter){
		this.props.history.push('/departments/'+parameter);
	}


	render(){
		let departmentLabels 

		if(this.props.departments.length > 0){
			departmentLabels = this.props.departments.map(department => {
				return (
					<span onClick={() => this.toCatalog(department.department_id)} style={{flex:'1'}} className='link topbar white' key={department.department_id}>
						{department.name}
					</span>
				)
			});
		}


		return(
			<div className='background-black' style={{height:'72px', paddingLeft:'30px', paddingRight:'30px', display:'flex', alignItems:'center'}}>
				<div style={{width:'20%', display:'inline-block'}}>
					<span onClick={this.toHome.bind(this)} className='link topbar pink' style={{fontSize:'24px', fontWeight:'500', letterSpacing:'2px'}}>SHOPMATE</span>
				</div>

				<div style={{display:'flex', width:'45%', justifyContent:'space-around', textAlign:'center'}}>
					{departmentLabels}
				</div>

				<div style={{width:'15%', display:'inline-block', textAlign:'center'}}>
					
				</div>

				<div style={{width:'30%', display:'flex', textAlign:'center', justifyContent:'center'}}>
					<input placeholder='Search Anything' className='form-control'/>
				</div>
				
			</div>

		);
	}
}



function mapStateToProps(state){
	return { 
		departments:state.departments.departments
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getDepartments,
	}, dispatch);
};

HeaderNavigation = connect(mapStateToProps, mapDispatchToProps)(HeaderNavigation);
export default withRouter(HeaderNavigation);




