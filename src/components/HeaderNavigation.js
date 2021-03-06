import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { 
	getDepartments
} from '../actions/index'

import search from '../icon/icons-search-black.png'



class HeaderNavigation extends Component {
	constructor(){
		super()

		this.state = {
			department_id:null
		}
	}


	componentWillMount(){
		//Update department id
		let department_id 
		if(this.props.match.params.id){
			department_id = this.props.match.params.id;
			this.setState({department_id:department_id})
		}
	}

	componentDidUpdate(prevProps, prevState){
		//Update department id
		if(prevProps.match !== this.props.match){
			let department_id = this.props.match.params.id;
			this.setState({department_id:department_id})
		}
	}



	toHome(){
		this.props.history.push('/');
	}

	toCatalog(parameter){
		this.props.history.push('/departments/'+parameter);
	}


	keyPress(e){
		if(e.keyCode == 13){
			if(e.target){
				let query = e.target.value
				if(!e.target.value){
					query = "_"
				}
				this.props.history.push('/browse' + '/?q=' + query);
			}
		}
	}

	render(){
		let departmentLabels 

		//Render department labels
		if(this.props.departments.length > 0){
			departmentLabels = this.props.departments.map(department => {

				let departmentStyle
				if(department.department_id == this.state.department_id){
					departmentStyle = 'link topbar pink'
				} else {
					departmentStyle = 'link topbar white'
				}

				return (
					<span onClick={() => this.toCatalog(department.department_id)} style={{flex:'1'}} className={departmentStyle} key={department.department_id}>
						{department.name}
					</span>
				)
			});
		}


		return(
			<div className='background-black' style={containerStyle}>
				<div style={{width:'25%', display:'inline-block'}}>
					<span onClick={this.toHome.bind(this)} className='link topbar pink' style={logoStyle}>SHOPMATE</span>
				</div>

				<div className='d-none d-sm-flex' style={{display:'flex', width:'40%', justifyContent:'space-around', textAlign:'center'}}>
					{departmentLabels}
				</div>

				<div className='d-sm-none' style={{width:'40%'}}>
				</div>

				<div style={{width:'10%'}}>
				</div>

				<div style={{width:'25%', display:'inline-block', textAlign:'right'}}>
					<input onKeyDown={this.keyPress.bind(this)} style={inputStyle} placeholder='Search...' className='form-control'/>
				</div>
			</div>
		);
	}
}


const containerStyle = {
	height:'60px', 
	paddingLeft:'15px', 
	paddingRight:'15px', 
	display:'flex', 
	alignItems:'center'
}

const logoStyle = {
	fontSize:'24px', 
	fontWeight:'500', 
	letterSpacing:'2px'
}

const inputStyle = {
	background:`white url(${search}) no-repeat`,
	backgroundPosition: 'left 10px bottom 8px',
	backgroundSize:'14px',
	paddingLeft:'36px'
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




