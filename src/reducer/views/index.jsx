"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var actions_1 = require("../actions");
var reducerName_1 = require("../reducerName");
var mapStateToProps = function (state) {
    return {
        state: state[reducerName_1.default] || { type: 1 }
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        action: function () { return dispatch(actions_1.onAction({ a: 1 })); }
    };
};
// export default connect(mapStateToProps, mapDispatchToProps)((props: any) => {
//   return (
//     <div>
//       Reducer:{props.state.type}
//       <button onClick={props.action}>action</button>
//     </div>
//   )
// });
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (<div>
        Reducer:{this.props.state.type}
        <button onClick={this.props.action}>action</button>
      </div>);
    };
    App.a = 1;
    return App;
}(react_1.default.Component));
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App);
