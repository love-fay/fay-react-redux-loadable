import * as types from './actionTypes';
import reducerName from './reducerName';

const reducer = (state = {}, action: any) => {
	const {type, params} = action;
	switch (type) {
		case types.ACTION: {
			return {
				type, params
			}
		}
		default: {
			return state;
		}
	}
};

export default {
	[reducerName]: reducer
}
