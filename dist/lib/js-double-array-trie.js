"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var double_array_trie_js_bind_1 = require("./double_array_trie_js_bind");
var text_encoding_1 = require("text-encoding");
var encoder = new text_encoding_1.TextEncoder();
function encode(key) {
    return encoder.encode(key);
}
var Trie = /** @class */ (function () {
    function Trie(trie) {
        this.trie = trie;
    }
    Trie.create = function (keys, values) {
        var lengths = [];
        var encodedKeys = [];
        var totalLength = 0;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var encoded = encode(key);
            encodedKeys.push(encoded);
            var length_1 = encoded.length;
            lengths.push(length_1);
            totalLength += length_1;
        }
        var keysFlatten = new Uint8Array(totalLength);
        var offset = 0;
        for (var _a = 0, encodedKeys_1 = encodedKeys; _a < encodedKeys_1.length; _a++) {
            var encoded = encodedKeys_1[_a];
            keysFlatten.set(encoded, offset);
            offset += encoded.length;
        }
        var lengthsInt32 = new Int32Array(lengths);
        return new Trie(double_array_trie_js_bind_1.StaticTrieInt32.new(lengthsInt32, keysFlatten, values));
    };
    Trie.deserialize = function (data, compressed) {
        var trie = double_array_trie_js_bind_1.StaticTrieInt32.deserialize(data, compressed);
        return new Trie(trie);
    };
    Trie.prototype.get = function (key) {
        var encoded = encode(key);
        return this.trie.get(encoded);
    };
    Trie.prototype.prefixSearch = function (key) {
        var encoded = encode(key);
        var flattenedResult = this.trie.prefix_search(encoded);
        var entryNum = flattenedResult.length / 2;
        var result = [];
        for (var i = 0; i < entryNum; i++) {
            result.push({
                value: flattenedResult[i * 2],
                length: flattenedResult[i * 2 + 1]
            });
        }
        return result;
    };
    Trie.prototype.size = function () {
        return this.trie.n_keys();
    };
    Trie.prototype.serialize = function (compress) {
        return this.trie.serialize(compress);
    };
    return Trie;
}());
exports.default = Trie;
//# sourceMappingURL=js-double-array-trie.js.map