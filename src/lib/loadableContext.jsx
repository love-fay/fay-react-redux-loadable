"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var errorBoundary_1 = require("./error/errorBoundary");
exports.default = react_1.default.createContext({ loadingBoundary: '', errorBoundary: errorBoundary_1.default });
