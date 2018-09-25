import { StaticTrieInt32 } from './double_array_trie_js_bind';
export default class Trie {
    trie: StaticTrieInt32;
    constructor(trie: StaticTrieInt32);
    static create(keys: string[], values: Int32Array): Trie;
    static deserialize(data: Uint8Array, compressed: boolean): Trie;
    get(key: string): number;
    prefixSearch(key: string): {
        value: number;
        length: number;
    }[];
    size(): number;
    serialize(compress: boolean): Uint8Array;
}
