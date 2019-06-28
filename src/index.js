import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Home from './layouts/Home';
import Departments from './layouts/Departments';
import Profile from './layouts/Profile';
import Cart from './layouts/Cart';
import Checkout from './layouts/Checkout';
import Browse from './layouts/Browse';
import Product from './layouts/Product';

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
	getCategories,
} from './actions/index';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);


//Setup
store.dispatch(setupCart())
store.dispatch(getDepartments())
store.dispatch(getCategories())


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

			<Route path='/browse' component={Browse}/>
		</HashRouter>
	</Provider>
, document.getElementById('root'));


serviceWorker.unregister();




