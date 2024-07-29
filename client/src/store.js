import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { appReducer, projectsReducer, userReducer } from './reducers';
const rootReducer = combineReducers({
	user: userReducer,
	app: appReducer,
	projects: projectsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);
