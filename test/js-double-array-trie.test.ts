import Trie from '../src/js-double-array-trie'

function createTrie() {
  let keys = ['abra', 'ab', 'cab', 'cabaa', 'abda']
  let values = new Int32Array([300, 500, 400, 0, 200])
  return Trie.create(keys, values)
}

test('prefix search', () => {
  expect(createTrie().prefixSearch('abracadabra')).toEqual([
    { value: 500, length: 2 },
    { value: 300, length: 4 }
  ])
  expect(createTrie().prefixSearch('abda')).toEqual([
    { value: 500, length: 2 },
    { value: 200, length: 4 }
  ])
  expect(createTrie().prefixSearch('abdaa')).toEqual([
    { value: 500, length: 2 },
    { value: 200, length: 4 }
  ])
  expect(createTrie().prefixSearch('')).toEqual([])
  expect(createTrie().prefixSearch('ca')).toEqual([])
  expect(createTrie().prefixSearch('cab')).toEqual([{ value: 400, length: 3 }])
  expect(createTrie().prefixSearch('cabaaaaa')).toEqual([
    { value: 400, length: 3 },
    { value: 0, length: 5 }
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
    { value: 500, length: 2 },
    { value: 300, length: 4 }
  ])
})
