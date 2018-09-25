
const path = require('path').join(__dirname, 'double_array_trie_js_bind_bg.wasm');
const bytes = require('fs').readFileSync(path);
let imports = {};
imports['./double_array_trie_js_bind'] = require('./double_array_trie_js_bind');

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
module.exports = wasmInstance.exports;
