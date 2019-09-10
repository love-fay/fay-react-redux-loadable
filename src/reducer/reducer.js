"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var types = require("./actionTypes");
var reducerName_1 = require("./reducerName");
var reducer = function (state, action) {
    if (state === void 0) { state = {}; }
    var type = action.type, params = action.params;
    switch (type) {
        case types.ACTION: {
            return {
                type: type, params: params
            };
        }
        default: {
            return state;
        }
    }
};
exports.default = (_a = {},
    _a[reducerName_1.default] = reducer,
    _a);
