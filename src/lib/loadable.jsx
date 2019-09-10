"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var connected_component_1 = require("./connected-component");
exports.default = (function (_a) {
    var view = _a.view, reducer = _a.reducer, saga = _a.saga;
    return function (props) { return <connected_component_1.default viewProps={props} reducer={reducer} saga={saga} view={view}/>; };
});
