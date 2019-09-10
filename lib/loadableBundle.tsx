/**
 * Created by feichongzheng on 17/9/12.
 */
import * as React from 'react';
import { ReactReduxContext } from 'react-redux';
import {injectAsyncStore} from './store';

interface Props {
  reducer: object | undefined,
  sagas: object | undefined,
  view: React.ComponentState,
  viewProps: Readonly<{}>
}

export default function MyConnectedComponent({reducer, sagas, view, viewProps}: Props) {
		const View = view;
		return (
			<ReactReduxContext.Consumer>
					{({ store }) => {
							injectAsyncStore(store, reducer, sagas);
							return <View {...viewProps}/>
					}}
			</ReactReduxContext.Consumer>
		);
};
