/**
 * Created by feichongzheng on 17/10/23.
 */
import { combineReducers } from 'redux';

export default function createReducer(asyncReducers:object) {
	const reducers = {
		...asyncReducers,
		root: () =>({'fay-react-redux-loadable': '1.0'})
	};
	return combineReducers(reducers);
}
