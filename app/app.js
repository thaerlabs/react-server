import React from 'react';
import ReactDOM from 'react-dom'
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';
import configureStore from './store/configureStore';

const store = configureStore(__INITIAL_STATE__);

ReactDOM.render(
	<Provider store={store}>
		<Router history={createBrowserHistory()} routes={routes}/>
	</Provider>,
	document.getElementById('app'));
