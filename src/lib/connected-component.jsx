"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var loadableContext_1 = require("./loadableContext");
var store_1 = require("./store");
var connectedComponent = function (_a) {
    var view = _a.view, reducer = _a.reducer, saga = _a.saga, viewProps = _a.viewProps;
    var View = view;
    return (<loadableContext_1.default.Consumer>
      {function (_a) {
        var errorBoundary = _a.errorBoundary;
        var ErrorBoundary = errorBoundary;
        return (<ErrorBoundary>
              <react_redux_1.ReactReduxContext.Consumer>
                {function (_a) {
            var store = _a.store;
            store_1.injectAsyncStore(store, reducer, saga);
            return <View {...viewProps}/>;
        }}
              </react_redux_1.ReactReduxContext.Consumer>
            </ErrorBoundary>);
    }}
    </loadableContext_1.default.Consumer>);
};
var unConnectedComponent = (<loadableContext_1.default.Consumer>
    {function (_a) {
    var loadingBoundary = _a.loadingBoundary;
    return loadingBoundary;
}}
  </loadableContext_1.default.Consumer>);
exports.default = (function (_a) {
    var reducer = _a.reducer, saga = _a.saga, view = _a.view, viewProps = _a.viewProps;
    var _b = react_1.default.useState(unConnectedComponent), component = _b[0], setComponent = _b[1];
    react_1.default.useEffect(function () {
        var promises = [view()];
        reducer && promises.push(reducer());
        saga && promises.push(saga());
        Promise.all(promises).then(function (values) {
            var _view = values[0], _reducer = values[1], _saga = values[2];
            setComponent(connectedComponent({ view: _view.default, reducer: _reducer && _reducer.default, saga: _saga && _saga.default, viewProps: viewProps }));
        });
    }, [true]);
    return component;
});
