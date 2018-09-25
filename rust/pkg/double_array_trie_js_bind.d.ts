/* tslint:disable */
export class StaticTrieInt32 {
free(): void;
static  new(arg0: Int32Array, arg1: Uint8Array, arg2: Int32Array): StaticTrieInt32;

 get(arg0: Uint8Array): number;

 prefix_search(arg0: Uint8Array): Int32Array;

 n_keys(): number;

 serialize(arg0: boolean): Uint8Array;

static  deserialize(arg0: Uint8Array, arg1: boolean): StaticTrieInt32;

}
