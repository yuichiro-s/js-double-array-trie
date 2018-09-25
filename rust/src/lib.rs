extern crate wasm_bindgen;
extern crate cfg_if;

use wasm_bindgen::prelude::*;

extern crate double_array_trie;

use double_array_trie::static_trie::Trie as StaticTrie;

use cfg_if::cfg_if;

cfg_if! {
    if #[cfg(feature = "console_error_panic_hook")] {
        extern crate console_error_panic_hook;
        pub use console_error_panic_hook::set_once as set_panic_hook;
    } else {
        #[inline]
        pub fn set_panic_hook() {}
    }
}

#[wasm_bindgen]
pub struct StaticTrieInt32 {
    trie: StaticTrie<i32>,
}

#[wasm_bindgen]
impl StaticTrieInt32 {
    pub fn new(lengths: &[i32], keys_flatten: &[u8], values: &[i32]) -> StaticTrieInt32 {
        set_panic_hook();

        let mut keys = Vec::new();
        let mut start = 0;
        for &length in lengths {
            let end = start + length as usize;
            keys.push(&keys_flatten[start..end]);
            start = end;
        }

        let mut entries = Vec::new();
        for (key, &value) in keys.iter().zip(values) {
            entries.push((key.to_vec(), value));
        }

        StaticTrieInt32 {
            trie: StaticTrie::new(&entries),
        }
    }

    pub fn get(&self, key: &[u8]) -> Option<i32> {
        self.trie.get(key)
    }

    pub fn prefix_search(&self, query: &[u8]) -> Vec<i32> {
        let mut result = Vec::new();
        for (value, len) in self.trie.prefix_search(&query) {
            result.push(value);
            result.push(len as i32);
        }
        result
    }

    pub fn n_keys(&self) -> usize {
        self.trie.n_keys()
    }

    pub fn serialize(&self, compress: bool) -> Vec<u8> {
        self.trie.serialize(compress).unwrap()
    }

    pub fn deserialize(data: &[u8], compressed: bool) -> StaticTrieInt32 {
        StaticTrieInt32 {
            trie: StaticTrie::deserialize(data, compressed).unwrap(),
        }
    }
}

