import { StaticTrieInt32 } from './double_array_trie_js_bind'
import { TextEncoder, TextDecoder } from 'text-encoding'

let encoder = new TextEncoder()
let decoder = new TextDecoder()

function encode(str: string): Uint8Array {
  return encoder.encode(str)
}

function decode(bytes: Uint8Array): string {
  return decoder.decode(bytes)
}

export default class Trie {
  trie: StaticTrieInt32

  constructor(trie: StaticTrieInt32) {
    this.trie = trie
  }

  static create(keys: string[], values: Int32Array): Trie {
    let lengths = []
    let encodedKeys = []
    let totalLength = 0
    for (const key of keys) {
      let encoded = encode(key)
      encodedKeys.push(encoded)
      let length = encoded.length
      lengths.push(length)
      totalLength += length
    }

    let keysFlatten = new Uint8Array(totalLength)
    let offset = 0
    for (const encoded of encodedKeys) {
      keysFlatten.set(encoded, offset)
      offset += encoded.length
    }

    let lengthsInt32 = new Int32Array(lengths)
    return new Trie(StaticTrieInt32.new(lengthsInt32, keysFlatten, values))
  }

  static deserialize(data: Uint8Array, compressed: boolean): Trie {
    let trie = StaticTrieInt32.deserialize(data, compressed)
    return new Trie(trie)
  }

  get(key: string): number {
    let encoded = encode(key)
    return this.trie.get(encoded)
  }

  prefixSearch(key: string): { value: number; match: string }[] {
    let encoded = encode(key)
    let flattenedResult = this.trie.prefix_search(encoded)
    let entryNum = flattenedResult.length / 2
    let result = []
    for (let i = 0; i < entryNum; i++) {
      let bytesNum = flattenedResult[i * 2 + 1];
      let match = decode(encoded.subarray(0, bytesNum));
      result.push({
        value: flattenedResult[i * 2],
        match: match,
      })
    }
    return result
  }

  size(): number {
    return this.trie.n_keys()
  }

  serialize(compress: boolean) {
    return this.trie.serialize(compress)
  }
}
