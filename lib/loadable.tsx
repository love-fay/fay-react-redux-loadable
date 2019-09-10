import React from 'react';
import ConnectedComponent from './connected-component';

type BaseType = Promise<any>

interface Props {
	view: BaseType,
	reducer?: BaseType,
	saga?: BaseType
	loading?: BaseType,
	error?: BaseType,
}

export default ({view, reducer, saga}:Props) => {
	return (props: any) => <ConnectedComponent viewProps={props} reducer={reducer} saga={saga} view={view}/>;
};