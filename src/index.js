import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Home from './Home';
import Departments from './Departments';
import Profile from './Profile';
import Cart from './Cart';
import Checkout from './Checkout';

import Product from './components/Product';
import Register from './components/Register';
import Login from './components/Login';

import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter, Route } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import { 
	setupCart,
	getDepartments,
} from './actions/index';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);


//Setup Cart
store.dispatch(setupCart())
store.dispatch(getDepartments())



ReactDOM.render(
	<Provider store={store}>
		<HashRouter basename='/'>
			<Route path="/" exact component={Home}/>
			<Route path="/departments/:id" component={Departments}/>
			<Route path="/product/:id" component={Product}/>

			<Route path='/register' component={Register}/>
			<Route path='/login' component={Login}/>

			<Route path='/profile' component={Profile}/>
			<Route path='/cart' component={Cart}/>

			<Route path='/checkout' component={Checkout}/>
		</HashRouter>
	</Provider>
, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
