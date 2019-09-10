import {applyMiddleware, compose, createStore} from 'redux';
import { createLogger } from 'redux-logger';
const logger = createLogger();
// import { routerMiddleware } from 'connected-react-router'
// import {createBrowserHistory} from 'history';
import createSagaMiddleware from 'redux-saga';

// const history = createBrowserHistory();
// const rMiddleware = routerMiddleware(history);

const win = window;

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION__: Function
	}
}
declare const process : {
	env: {
		NODE_ENV: string
	}
};

import createReducer from './reducers';

export function injectAsyncStore(store:any, asyncReducers: any, sagas: any) {
	asyncReducers && injectAsyncReducers(store, asyncReducers);
	sagas && injectAsyncSagas(store, sagas);
}

function injectAsyncReducers(store: any, asyncReducers: any) {
	let flag = false;
	for (const key in asyncReducers) {
		if(Object.prototype.hasOwnProperty.call(asyncReducers, key)) {
			if (!store.asyncReducers[key]) {
				store.asyncReducers[key] = asyncReducers[key];
				flag = true;
			}
		}
	}
	flag && store.replaceReducer(createReducer(store.asyncReducers));
}

function injectAsyncSagas(store: any, sagas: any) {
	for (const key in sagas) {
		if(Object.prototype.hasOwnProperty.call(sagas, key)) {
			if (!store.asyncSagas[key]) {
				store.asyncSagas[key] = sagas[key];
				store.sagaMiddleware.run(sagas[key]);
			}
		}
	}
}

export function rejectAsyncStore(store: any, asyncReducers=null) {
	asyncReducers && rejectAsyncReducers(store, asyncReducers);
}

function rejectAsyncReducers(store: any, asyncReducers: any) {
	let flag = false;
	for (const key in asyncReducers) {
		if(Object.prototype.hasOwnProperty.call(asyncReducers, key)) {
			if (store.asyncReducers[key]) {
				delete store.asyncReducers[key];
				flag = true;
			}
		}
	}
	flag && store.replaceReducer(createReducer(store.asyncReducers));
}


export default function initStore(initReducers={}, reduxMiddlewares=[]) {
	const sagaMiddleware = createSagaMiddleware();

// const middlewares = [rMiddleware, sagaMiddleware];
	const middlewares:any = [...reduxMiddlewares, sagaMiddleware];

	if (process.env.NODE_ENV !== 'production') {
		import(/* webpackChunkName: "redux-immutable-state-invariant" */'redux-immutable-state-invariant').then(
		({default: _}) => {
			middlewares.push(_())
		}
		);
	}
	const storeEnhancers = compose(
	applyMiddleware(...middlewares, logger),
	(win && win.__REDUX_DEVTOOLS_EXTENSION__) ? win.__REDUX_DEVTOOLS_EXTENSION__() : (f:any) => f,
	);
	const store = createStore(createReducer(initReducers), storeEnhancers);
	return {...store, asyncReducers: {}, asyncSagas: {}, sagaMiddleware};
}
