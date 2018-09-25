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
module.exports.StaticTrieInt32 = StaticTrieInt32;

const TextDecoder = require('util').TextDecoder;

let cachedDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

module.exports.__wbindgen_throw = function(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
};

wasm = require('./double_array_trie_js_bind_bg');
