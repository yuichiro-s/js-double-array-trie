(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('path'), require('fs'), require('util')) :
    typeof define === 'function' && define.amd ? define(['path', 'fs', 'util'], factory) :
    (global.jsDoubleArrayTrie = factory(global.path,global.fs,global.util));
}(this, (function (path,fs,util) { 'use strict';

    path = path && path.hasOwnProperty('default') ? path['default'] : path;
    fs = fs && fs.hasOwnProperty('default') ? fs['default'] : fs;
    var util__default = 'default' in util ? util['default'] : util;

    const path$1 = path.join(__dirname, 'double_array_trie_js_bind_bg.wasm');
    const bytes = fs.readFileSync(path$1);
    let imports = {};
    imports['./double_array_trie_js_bind'] = double_array_trie_js_bind;

    const wasmModule = new WebAssembly.Module(bytes);
    const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
    var double_array_trie_js_bind_bg = wasmInstance.exports;

    /* tslint:disable */
    var wasm;

    let cachegetUint32Memory = null;
    function getUint32Memory() {
        if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
            cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
        }
        return cachegetUint32Memory;
    }

    function passArray32ToWasm(arg) {
        const ptr = wasm.__wbindgen_malloc(arg.length * 4);
        getUint32Memory().set(arg, ptr / 4);
        return [ptr, arg.length];
    }

    let cachegetUint8Memory = null;
    function getUint8Memory() {
        if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
            cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
        }
        return cachegetUint8Memory;
    }

    function passArray8ToWasm(arg) {
        const ptr = wasm.__wbindgen_malloc(arg.length * 1);
        getUint8Memory().set(arg, ptr / 1);
        return [ptr, arg.length];
    }

    let cachedGlobalArgumentPtr = null;
    function globalArgumentPtr() {
        if (cachedGlobalArgumentPtr === null) {
            cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
        }
        return cachedGlobalArgumentPtr;
    }

    let cachegetInt32Memory = null;
    function getInt32Memory() {
        if (cachegetInt32Memory === null || cachegetInt32Memory.buffer !== wasm.memory.buffer) {
            cachegetInt32Memory = new Int32Array(wasm.memory.buffer);
        }
        return cachegetInt32Memory;
    }

    function getArrayI32FromWasm(ptr, len) {
        return getInt32Memory().subarray(ptr / 4, ptr / 4 + len);
    }

    function getArrayU8FromWasm(ptr, len) {
        return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
    }

    function freeStaticTrieInt32(ptr) {

        wasm.__wbg_statictrieint32_free(ptr);
    }
    /**
    */
    class StaticTrieInt32 {

        static __construct(ptr) {
            return new StaticTrieInt32(ptr);
        }

        constructor(ptr) {
            this.ptr = ptr;

        }

        free() {
            const ptr = this.ptr;
            this.ptr = 0;
            freeStaticTrieInt32(ptr);
        }
        /**
        * @param {Int32Array} arg0
        * @param {Uint8Array} arg1
        * @param {Int32Array} arg2
        * @returns {StaticTrieInt32}
        */
        static new(arg0, arg1, arg2) {
            const [ptr0, len0] = passArray32ToWasm(arg0);
            const [ptr1, len1] = passArray8ToWasm(arg1);
            const [ptr2, len2] = passArray32ToWasm(arg2);
            try {
                return StaticTrieInt32.__construct(wasm.statictrieint32_new(ptr0, len0, ptr1, len1, ptr2, len2));

            } finally {
                wasm.__wbindgen_free(ptr0, len0 * 4);
                wasm.__wbindgen_free(ptr1, len1 * 1);
                wasm.__wbindgen_free(ptr2, len2 * 4);

            }

        }
        /**
        * @param {Uint8Array} arg0
        * @returns {number}
        */
        get(arg0) {
            if (this.ptr === 0) {
                throw new Error('Attempt to use a moved value');
            }
            const [ptr0, len0] = passArray8ToWasm(arg0);
            const retptr = globalArgumentPtr();
            try {

                wasm.statictrieint32_get(retptr, this.ptr, ptr0, len0);
                const present = getUint32Memory()[retptr / 4];
                const value = getInt32Memory()[retptr / 4 + 1];
                return present === 0 ? undefined : value;


            } finally {
                wasm.__wbindgen_free(ptr0, len0 * 1);

            }

        }
        /**
        * @param {Uint8Array} arg0
        * @returns {Int32Array}
        */
        prefix_search(arg0) {
            if (this.ptr === 0) {
                throw new Error('Attempt to use a moved value');
            }
            const [ptr0, len0] = passArray8ToWasm(arg0);
            const retptr = globalArgumentPtr();
            try {
                wasm.statictrieint32_prefix_search(retptr, this.ptr, ptr0, len0);
                const mem = getUint32Memory();
                const rustptr = mem[retptr / 4];
                const rustlen = mem[retptr / 4 + 1];

                const realRet = getArrayI32FromWasm(rustptr, rustlen).slice();
                wasm.__wbindgen_free(rustptr, rustlen * 4);
                return realRet;


            } finally {
                wasm.__wbindgen_free(ptr0, len0 * 1);

            }

        }
        /**
        * @returns {number}
        */
        n_keys() {
            if (this.ptr === 0) {
                throw new Error('Attempt to use a moved value');
            }
            return wasm.statictrieint32_n_keys(this.ptr);
        }
        /**
        * @param {boolean} arg0
        * @returns {Uint8Array}
        */
        serialize(arg0) {
            if (this.ptr === 0) {
                throw new Error('Attempt to use a moved value');
            }
            const retptr = globalArgumentPtr();
            wasm.statictrieint32_serialize(retptr, this.ptr, arg0 ? 1 : 0);
            const mem = getUint32Memory();
            const rustptr = mem[retptr / 4];
            const rustlen = mem[retptr / 4 + 1];

            const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
            wasm.__wbindgen_free(rustptr, rustlen * 1);
            return realRet;

        }
        /**
        * @param {Uint8Array} arg0
        * @param {boolean} arg1
        * @returns {StaticTrieInt32}
        */
        static deserialize(arg0, arg1) {
            const [ptr0, len0] = passArray8ToWasm(arg0);
            try {
                return StaticTrieInt32.__construct(wasm.statictrieint32_deserialize(ptr0, len0, arg1 ? 1 : 0));

            } finally {
                wasm.__wbindgen_free(ptr0, len0 * 1);

            }

        }
    }
    var StaticTrieInt32_1 = StaticTrieInt32;

    const TextDecoder = util__default.TextDecoder;

    let cachedDecoder = new TextDecoder('utf-8');

    function getStringFromWasm(ptr, len) {
        return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
    }

    var __wbindgen_throw = function(ptr, len) {
        throw new Error(getStringFromWasm(ptr, len));
    };

    wasm = double_array_trie_js_bind_bg;

    var double_array_trie_js_bind = {
    	StaticTrieInt32: StaticTrieInt32_1,
    	__wbindgen_throw: __wbindgen_throw
    };

    var encoder = new util.TextEncoder();
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
            return new Trie(StaticTrieInt32_1.new(lengthsInt32, keysFlatten, values));
        };
        Trie.deserialize = function (data, compressed) {
            var trie = StaticTrieInt32_1.deserialize(data, compressed);
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

    return Trie;

})));
//# sourceMappingURL=js-double-array-trie.umd.js.map
