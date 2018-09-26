import Trie from '../src/js-double-array-trie'

function createTrie() {
  let keys = ['abra', 'ab', 'cab', 'cabaa', 'abda']
  let values = new Int32Array([300, 500, 400, 0, 200])
  return Trie.create(keys, values)
}

test('prefix search', () => {
  expect(createTrie().prefixSearch('abracadabra')).toEqual([
    { value: 500, match: 'ab' },
    { value: 300, match: 'abra' }
  ])
  expect(createTrie().prefixSearch('abda')).toEqual([
    { value: 500, match: 'ab' },
    { value: 200, match: 'abda' }
  ])
  expect(createTrie().prefixSearch('abdaa')).toEqual([
    { value: 500, match: 'ab' },
    { value: 200, match: 'abda' }
  ])
  expect(createTrie().prefixSearch('')).toEqual([])
  expect(createTrie().prefixSearch('ca')).toEqual([])
  expect(createTrie().prefixSearch('cab')).toEqual([{ value: 400, match: 'cab' }])
  expect(createTrie().prefixSearch('cabaaaaa')).toEqual([
    { value: 400, match: 'cab' },
    { value: 0, match: 'cabaa' }
  ])
})

test('get', () => {
  expect(createTrie().get('abraca')).toEqual(undefined)
  expect(createTrie().get('abra')).toEqual(300)
  expect(createTrie().get('abr')).toEqual(undefined)
  expect(createTrie().get('ab')).toEqual(500)
  expect(createTrie().get('a')).toEqual(undefined)
  expect(createTrie().get('')).toEqual(undefined)
  expect(createTrie().get('abdaa')).toEqual(undefined)
  expect(createTrie().get('abda')).toEqual(200)
  expect(createTrie().get('abd')).toEqual(undefined)
  expect(createTrie().get('c')).toEqual(undefined)
  expect(createTrie().get('ca')).toEqual(undefined)
  expect(createTrie().get('cab')).toEqual(400)
  expect(createTrie().get('caba')).toEqual(undefined)
  expect(createTrie().get('cabaa')).toEqual(0)
  expect(createTrie().get('cabaab')).toEqual(undefined)
})

test('size', () => {
  expect(createTrie().size()).toEqual(5)
})

test('serialize/deserialize', () => {
  let data = createTrie().serialize(true)
  let trie = Trie.deserialize(data, true)
  expect(trie.prefixSearch('abracadabra')).toEqual([
    { value: 500, match: 'ab' },
    { value: 300, match: 'abra' }
  ])
})

test('unicode', () => {
  let keys = ['火曜日', '火星', '日本', '日本語', '日本人']
  let values = new Int32Array([300, 500, 400, 0, 200])
  let data = Trie.create(keys, values).serialize(true)
  let trie = Trie.deserialize(data, true)
  expect(trie.prefixSearch('日本人です')).toEqual([
    { value: 400, match: '日本' },
    { value: 200, match: '日本人' }
  ])
  expect(trie.prefixSearch('日本人')).toEqual([
    { value: 400, match: '日本' },
    { value: 200, match: '日本人' }
  ])
  expect(trie.prefixSearch('日本語')).toEqual([
    { value: 400, match: '日本' },
    { value: 0, match: '日本語' }
  ])
  expect(trie.prefixSearch('日本')).toEqual([
    { value: 400, match: '日本' }
  ])
  expect(trie.prefixSearch('日')).toEqual([])
  expect(trie.prefixSearch('火曜日')).toEqual([
    { value: 300, match: '火曜日' }
  ])
  expect(trie.prefixSearch('火曜')).toEqual([])
  expect(trie.prefixSearch('火')).toEqual([])
  expect(trie.prefixSearch('水曜日')).toEqual([])
  expect(trie.prefixSearch('火星人です')).toEqual([
    { value: 500, match: '火星' }
  ])
  expect(trie.get('火星人です')).toEqual(undefined)
  expect(trie.get('火星')).toEqual(500)
  expect(trie.get('火')).toEqual(undefined)
});