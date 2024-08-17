import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	appReducer,
	paginationReducer,
	projectsReducer,
	userReducer,
} from './reducers';
import { teamsReducer } from './reducers/teams-reducer';
const rootReducer = combineReducers({
	user: userReducer,
	app: appReducer,
	projects: projectsReducer,
	teams: teamsReducer,
	pagination: paginationReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);
