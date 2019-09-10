"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types = require("./actionTypes");
exports.onAction = function (params) { return ({
    type: types.ACTION,
    params: params
}); };
