import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import '../node_modules/font-awesome/css/font-awesome.min.css';

import App from './components/App';
import reducers from './reducers';

// create store, first arg is reducers, second is setting up intial state, third is middleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Provider is a react component that knows how to handle changes to the store,
// Provider will inform all children (App and rest of components) during any changes to store.
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
