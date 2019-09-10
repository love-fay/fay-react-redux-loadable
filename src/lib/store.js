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
var redux_1 = require("redux");
var redux_logger_1 = require("redux-logger");
var logger = redux_logger_1.createLogger();
// import { routerMiddleware } from 'connected-react-router'
// import {createBrowserHistory} from 'history';
var redux_saga_1 = require("redux-saga");
// const history = createBrowserHistory();
// const rMiddleware = routerMiddleware(history);
var win = window;
var reducers_1 = require("./reducers");
function injectAsyncStore(store, asyncReducers, sagas) {
    asyncReducers && injectAsyncReducers(store, asyncReducers);
    sagas && injectAsyncSagas(store, sagas);
}
exports.injectAsyncStore = injectAsyncStore;
function injectAsyncReducers(store, asyncReducers) {
    var flag = false;
    for (var key in asyncReducers) {
        if (Object.prototype.hasOwnProperty.call(asyncReducers, key)) {
            if (!store.asyncReducers[key]) {
                store.asyncReducers[key] = asyncReducers[key];
                flag = true;
            }
        }
    }
    flag && store.replaceReducer(reducers_1.default(store.asyncReducers));
}
function injectAsyncSagas(store, sagas) {
    for (var key in sagas) {
        if (Object.prototype.hasOwnProperty.call(sagas, key)) {
            if (!store.asyncSagas[key]) {
                store.asyncSagas[key] = sagas[key];
                store.sagaMiddleware.run(sagas[key]);
            }
        }
    }
}
function rejectAsyncStore(store, asyncReducers) {
    if (asyncReducers === void 0) { asyncReducers = null; }
    asyncReducers && rejectAsyncReducers(store, asyncReducers);
}
exports.rejectAsyncStore = rejectAsyncStore;
function rejectAsyncReducers(store, asyncReducers) {
    var flag = false;
    for (var key in asyncReducers) {
        if (Object.prototype.hasOwnProperty.call(asyncReducers, key)) {
            if (store.asyncReducers[key]) {
                delete store.asyncReducers[key];
                flag = true;
            }
        }
    }
    flag && store.replaceReducer(reducers_1.default(store.asyncReducers));
}
function initStore(initReducers, reduxMiddlewares) {
    if (initReducers === void 0) { initReducers = {}; }
    if (reduxMiddlewares === void 0) { reduxMiddlewares = []; }
    var sagaMiddleware = redux_saga_1.default();
    // const middlewares = [rMiddleware, sagaMiddleware];
    var middlewares = reduxMiddlewares.concat([sagaMiddleware]);
    if (process.env.NODE_ENV !== 'production') {
        Promise.resolve().then(function () { return require(/* webpackChunkName: "redux-immutable-state-invariant" */ 'redux-immutable-state-invariant'); }).then(function (_a) {
            var _ = _a.default;
            middlewares.push(_());
        });
    }
    var storeEnhancers = redux_1.compose(redux_1.applyMiddleware.apply(void 0, middlewares.concat([logger])), (win && win.__REDUX_DEVTOOLS_EXTENSION__) ? win.__REDUX_DEVTOOLS_EXTENSION__() : function (f) { return f; });
    var store = redux_1.createStore(reducers_1.default(initReducers), storeEnhancers);
    return __assign({}, store, { asyncReducers: {}, asyncSagas: {}, sagaMiddleware: sagaMiddleware });
}
exports.default = initStore;
