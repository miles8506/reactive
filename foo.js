const obj1 = {
  name: 'miles',
  age: 30
}

function obj1Name1() {
  console.log('obj1Name1');
}

function obj1Name2() {
  console.log('obj1Name2');
}

function obj1Age1() {
  console.log('obj1Age1');
}

function obj1Age2() {
  console.log('obj1Age2');
}

const map = new Map()
map.set('name', [obj1Name1, obj1Name2])
map.set('age', [obj1Age1, obj1Age2])

const weakMap = new WeakMap()
weakMap.set(obj1, map)

obj1.age = 40
weakMap.get(obj1).get('name').forEach(fn => fn())
