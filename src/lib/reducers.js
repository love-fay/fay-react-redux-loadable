"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by feichongzheng on 17/10/23.
 */
var redux_1 = require("redux");
function createReducer(asyncReducers) {
    var reducers = __assign({}, asyncReducers, { root: function () { return ({ 'fay-react-redux-loadable': '1.0' }); } });
    return redux_1.combineReducers(reducers);
}
exports.default = createReducer;
