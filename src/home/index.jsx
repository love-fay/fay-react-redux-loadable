"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by feichongzheng on 17/10/13.
 */
var loadable_1 = require("../lib/loadable");
exports.default = loadable_1.default({
    view: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "Home" */ './views'); }); }
});
