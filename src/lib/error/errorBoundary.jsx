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
var React = require("react");
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.goBack = function () {
            window.history.go(-1);
        };
        _this.goHome = function () {
            window.location.href = '/';
        };
        _this.state = {
            hasError: false,
        };
        return _this;
    }
    ErrorBoundary.prototype.componentDidCatch = function () {
        this.setState({ hasError: true });
    };
    ErrorBoundary.prototype.render = function () {
        if (this.state.hasError) {
            var info = this.props.info;
            return <h1>{info || <div>页面出现错误,加载失败</div>}</h1>;
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(React.Component));
exports.default = ErrorBoundary;
