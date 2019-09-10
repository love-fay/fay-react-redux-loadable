import * as types from './actionTypes';

export const onAction = (params:object) => ({
	type: types.ACTION,
	params
});
