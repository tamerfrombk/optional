"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Optional = void 0;
var Optional = /** @class */ (function () {
    function Optional(data) {
        if (data === void 0) { data = undefined; }
        this.data = data;
        this.data = data;
    }
    Optional.of = function (data) {
        if (!data) {
            throw new Error('optional initialized with falsy value -- use ofFalsy() instead');
        }
        return new Optional(data);
    };
    Optional.ofFalsy = function (data) {
        return new Optional(data);
    };
    Optional.empty = function () {
        return new Optional();
    };
    Optional.prototype.isPresent = function () {
        return !!this.data;
    };
    Optional.prototype.isEmpty = function () {
        return !this.isPresent();
    };
    Optional.prototype.get = function () {
        if (this.isEmpty()) {
            throw new Error('get() on empty optional');
        }
        return this.data;
    };
    Optional.prototype.orElse = function (value) {
        return this.orElseGet(function () { return value; });
    };
    Optional.prototype.orElseGet = function (fn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.isPresent() ? this.data : fn.apply(void 0, args);
    };
    Optional.prototype.orElseThrow = function (throwable) {
        if (this.isPresent()) {
            return this.data;
        }
        throw throwable();
    };
    Optional.prototype.map = function (fn) {
        return this.isPresent()
            ? Optional.of(fn(this.data))
            : Optional.empty();
    };
    Optional.prototype.flatMap = function (fn) {
        return this.isPresent() ? fn(this.data) : Optional.empty();
    };
    Optional.prototype.filter = function (fn) {
        if (this.isEmpty()) {
            return Optional.empty();
        }
        var typedData = this.data;
        return fn(typedData) ? Optional.of(typedData) : Optional.empty();
    };
    Optional.prototype.ifPresent = function (fn) {
        if (this.isPresent()) {
            fn(this.data);
        }
    };
    return Optional;
}());
exports.Optional = Optional;
