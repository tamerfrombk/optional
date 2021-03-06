"use strict";
/*
   Copyright 2020 Tamer Aly

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
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
exports.Optional = exports.NoSuchElementException = void 0;
/**
 * This Error is thrown to indicate that the element requested from the Optional is not present.
 */
var NoSuchElementException = /** @class */ (function (_super) {
    __extends(NoSuchElementException, _super);
    function NoSuchElementException(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'NoSuchElementException';
        return _this;
    }
    return NoSuchElementException;
}(Error));
exports.NoSuchElementException = NoSuchElementException;
var Optional = /** @class */ (function () {
    function Optional(data) {
        if (data === void 0) { data = undefined; }
        this.data = data;
        this.data = data;
    }
    /**
     * Returns an Optional with the specified present truthy value. If the provided value is falsy,
     * a NoSuchElementException is thrown. To initialize an Optional with potentially falsy data, use ofFalsy() instead.
     *
     * @param data the element to initialize the Optional with
     */
    Optional.of = function (data) {
        if (!data) {
            throw new NoSuchElementException('optional initialized with falsy value -- use ofFalsy() instead');
        }
        return new Optional(data);
    };
    /**
     * Returns an Optional describing the specified value, if truthy, otherwise returns an empty Optional.
     *
     * @param data the element to initialize the Optional with
     */
    Optional.ofFalsy = function (data) {
        return new Optional(data);
    };
    /**
     * Returns an empty Optional instance.
     */
    Optional.empty = function () {
        return new Optional();
    };
    /**
     * Return true if there is a value present, otherwise false.
     */
    Optional.prototype.isPresent = function () {
        return !!this.data;
    };
    /**
     * Return true if a value is absent, otherwise false.
     */
    Optional.prototype.isEmpty = function () {
        return !this.isPresent();
    };
    /**
     * If a value is present in this Optional, returns the value, otherwise throws NoSuchElementException.
     * This function should be used sparingly; prefer to use orElse() or orElseGet() to extract
     * Optional values.
     *
     */
    Optional.prototype.get = function () {
        if (this.isEmpty()) {
            throw new NoSuchElementException('get() on empty optional');
        }
        return this.data;
    };
    /**
     * Return the value if present, otherwise return other.
     *
     * @param other the other value to return
     */
    Optional.prototype.orElse = function (other) {
        return this.orElseGet(function () { return other; });
    };
    /**
     * Return the value if present, otherwise invoke supplier and return the result of that invocation.
     *
     * @param supplier the function supplying another value
     * @param args the arguments to the supplier
     */
    Optional.prototype.orElseGet = function (supplier) {
        return this.isPresent() ? this.data : supplier();
    };
    /**
     * Return the contained value, if present, otherwise throw an exception to be created by the provided supplier.
     *
     * @param throwable a supplier function that returns a throwable object
     */
    Optional.prototype.orElseThrow = function (throwable) {
        if (this.isPresent()) {
            return this.data;
        }
        throw throwable();
    };
    /**
     * If a value is present, apply the provided mapping function to it,
     * and if the result is non-null, return an Optional describing the result.
     *
     * @param mapper the function to map over the element
     */
    Optional.prototype.map = function (mapper) {
        return this.isPresent()
            ? Optional.of(mapper(this.data))
            : Optional.empty();
    };
    /**
     * If a value is present, apply the provided Optional-bearing mapping function to it,
     * return that result, otherwise return an empty Optional.
     *
     * @param mapper a function returning an Optional to map to the element contained in this Optional.
     */
    Optional.prototype.flatMap = function (mapper) {
        return this.isPresent() ? mapper(this.data) : Optional.empty();
    };
    /**
     * If a value is present, and the value matches the given predicate,
     * return an Optional describing the value, otherwise return an empty Optional.
     *
     * @param pred the unary predicate function to apply to the element
     */
    Optional.prototype.filter = function (pred) {
        if (this.isEmpty()) {
            return Optional.empty();
        }
        var typedData = this.data;
        return pred(typedData) ? Optional.of(typedData) : Optional.empty();
    };
    /**
     * If a value is present, invoke the specified consumer with the value, otherwise do nothing.
     *
     * @param consumer a consumer function
     */
    Optional.prototype.ifPresent = function (consumer) {
        if (this.isPresent()) {
            consumer(this.data);
        }
    };
    /**
     * If a value is present, invoke the specified consumer with the value, otherwise invoke the action.
     *
     * @param consumer a consumer function
     * @param action   a action function
     */
    Optional.prototype.ifPresentOrElse = function (consumer, action) {
        this.isPresent()
            ? consumer(this.data)
            : action();
    };
    /**
     * If a value is present, returns an Optional describing the value, otherwise returns an Optional produced by the
     * supplying function.
     *
     * @param supplier the supplier function
     */
    Optional.prototype.or = function (supplier) {
        return this.isPresent()
            ? Optional.ofFalsy(this.data)
            : supplier();
    };
    /**
     * Returns a JSON object representation of the Optional.
     */
    Optional.prototype.json = function () {
        return {
            value: this.data || null
        };
    };
    return Optional;
}());
exports.Optional = Optional;
