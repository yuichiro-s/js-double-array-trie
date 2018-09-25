# js-double-array-trie

An implementation of static trie using double array.
Currently, only string keys and int32 values are supported.

## Install

Go to `js-double-array-trie`, then
```
npm install
```

## Test

Go to `js-double-array-trie`, then
```
npm test
```

## Usage

See `js-double-array-trie/test/js-double-array-trie.test.ts`

```ts
import Trie from "js-double-array-trie"

// construction
let keys = ["abra", "ab", "cab", "cabaa", "abda"];
let values = new Int32Array([300, 500, 400, 0, 200]);
let trie = Trie.create(keys, values);

// lookup
trie.get("abra");          // -> 300
trie.get("abracadabra");   // -> undefined
trie.get("a");             // -> undefined

// prefix search
trie.prefixSearch("abracadabra");   // -> [{ value: 500, length: 2 }, { value: 300, length: 4 }]
trie.prefixSearch("abba");          // -> [{ value: 500, length: 2 }]
trie.prefixSearch("a");             // -> []

// serialization with snappy compression
let data = trie.serialize(true);

// deserialization with snappy decompression
let trie = Trie.deserialize(data, true);
```
