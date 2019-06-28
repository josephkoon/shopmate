import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import facebook from '../icon/icons-facebook-grey.png'
import instagram from '../icon/icons-instagram-grey.png'
import pinterest from '../icon/icons-pinterest-grey.png'
import twitter from '../icon/icons-twitter-grey.png'


class Footer extends Component {

	toCatalog(parameter){
		this.props.history.push('/departments/'+parameter);
	}

	render(){
		let departmentLabels;

		//Render department labels
		if(this.props.departments.length > 0){
			departmentLabels = this.props.departments.map(department => {
				return (
					<span onClick={() => this.toCatalog(department.department_id)} style={{flex:'1'}} className='link topbar white' key={department.department_id}>
						<strong>{department.name}</strong>
					</span>
				)
			});
		}

		return(
			<div className='background-black' style={containerStyle}>
			
				<div style={departmentsStyle}>
					{departmentLabels}
				</div>
		
				<div style={socialStyle}>
					<span className='topbar dark-gray' style={{flex:'1'}}>
						<img style={{width:'24px'}} src={instagram} alt=""/> 
					</span>
					<span className='topbar dark-gray' style={{flex:'1'}}>
						<img style={{width:'24px'}} src={pinterest} alt=""/> 
					</span>
					<span className='topbar dark-gray' style={{flex:'1'}}>
						<img style={{width:'24px'}} src={twitter} alt=""/> 
					</span>
					<span className='topbar dark-gray' style={{flex:'1'}}>
						<img style={{width:'24px'}} src={facebook} alt=""/> 
					</span>
				</div>

				<div style={companyStyle}>
					<span className='topbar dark-gray' style={{flex:'1'}}>©2016 shopmate Ltd  •  Contact  • Privacy Policy</span>
				</div>
			</div>
		);
	}
}


const containerStyle = {
	width:'100%', 
	textAlign:'center', 
	padding:'15px'
}

const departmentsStyle = {
	margin:'auto', 
	width:'60%', 
	paddingTop:'15px', 
	paddingBottom:'15px',  
	display:'flex', 
	justifyContent:'space-around'
}

const socialStyle = {
	margin:'auto', 
	width:'25%', 
	paddingTop:'15px', 
	paddingBottom:'15px', 
	display:'flex', 
	justifyContent:'space-around'
}

const companyStyle = {
	margin:'auto', 
	width:'40%', 
	paddingTop:'15px', 
	paddingBottom:'15px',  
	display:'flex', 
	justifyContent:'space-around'
}


function mapStateToProps(state){
	return { 
		departments:state.departments.departments
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({

	}, dispatch);
};

Footer = connect(mapStateToProps, mapDispatchToProps)(Footer);
export default withRouter(Footer);

