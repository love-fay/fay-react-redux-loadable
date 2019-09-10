/**
 * Created by feichongzheng on 16/12/18.
 */
import React from 'react';
import {Provider} from 'react-redux';
import ErrorBoundary from './error/errorBoundary';
import LoadableContext from './loadableContext';
import initStore from './store';

interface Props {
	children: any,
	initReducer?: object,
	reduxMiddlewares?: [],
	loadingBoundary?: any,
	errorBoundary?: any
}

const defaultLoading = <div>loading...</div>;

export default ({children, initReducer, reduxMiddlewares, loadingBoundary=defaultLoading, errorBoundary=ErrorBoundary}: Props) => {
	const store = initStore(initReducer, reduxMiddlewares);
	return (
		<Provider store={store}>
			<LoadableContext.Provider value={{loadingBoundary, errorBoundary}}>
				{children}
			</LoadableContext.Provider>
		</Provider>
	);
}
