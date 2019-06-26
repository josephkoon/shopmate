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
			<div className='background-black' style={{width:'100%', textAlign:'center', padding:'15px'}}>
				<div style={{margin:'auto', width:'60%', paddingTop:'15px', paddingBottom:'15px',  display:'flex', justifyContent:'space-around'}}>
					{departmentLabels}
				</div>
		
				<div style={{margin:'auto', width:'20%', paddingTop:'15px', paddingBottom:'15px', display:'flex', justifyContent:'space-around'}}>
					<span className='topbar dark-gray' style={{flex:'1'}}>
						<img style={{width:'24px'}} src={instagram}/> 
					</span>
					<span className='topbar dark-gray' style={{flex:'1'}}>
						<img style={{width:'24px'}} src={pinterest}/> 
					</span>
					<span className='topbar dark-gray' style={{flex:'1'}}>
						<img style={{width:'24px'}} src={twitter}/> 
					</span>
					<span className='topbar dark-gray' style={{flex:'1'}}>
						<img style={{width:'24px'}} src={facebook}/> 
					</span>
				</div>

				<div style={{margin:'auto', width:'40%', paddingTop:'15px', paddingBottom:'15px',  display:'flex', justifyContent:'space-around'}}>
					<span className='topbar dark-gray' style={{flex:'1'}}>©2016 shopmate Ltd  •  Contact  • Privacy Policy</span>
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

	}, dispatch);
};

Footer = connect(mapStateToProps, mapDispatchToProps)(Footer);
export default withRouter(Footer);

