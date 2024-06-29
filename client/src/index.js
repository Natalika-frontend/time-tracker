import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { TimeTracker } from './time-tracker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<TimeTracker />
		</Provider>
	</BrowserRouter>
);
