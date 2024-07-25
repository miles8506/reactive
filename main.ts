type TargetType = Record<string, unknown>

class Depend {
  reactiveFns: Array<() => void>

  constructor() {
    this.reactiveFns = []
  }

  addDepend(fn: () => void) {
    this.reactiveFns.push(fn)
  }

  notify() {
    this.reactiveFns.forEach(fn => fn())
  }
}

const targetMap = new WeakMap<TargetType, Map<string, Depend>>()

function getDepend(target: TargetType, key: keyof TargetType) {
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }

  return depend
}

const obj = {
  name: 'miles',
  age: 30
}

const proxyObj = new Proxy(obj, {
  get(target, key, receive) {
    const depend = getDepend(target, key as string)
    activeFn && depend.addDepend(activeFn)
    return Reflect.get(target, key, receive)
  },
  set(target, key, newValue, receive) {
    const val = Reflect.set(target, key, newValue, receive)
    const depend = getDepend(target, key as string)
    depend.notify()
    return val
  }
})

let activeFn: null | (() => void) = null
function watchFn(fn: () => void) {
  activeFn = fn
  fn()
  activeFn = null
}

watchFn(() => {
  console.log('name start----')
  console.log(proxyObj.name)
  console.log('name end----')
})

watchFn(() => {
  console.log('age1 start----')
  console.log(proxyObj.age)
  console.log(proxyObj.name);
  console.log('age1 end----')
})

watchFn(() => {
  console.log('age2 start----')
  console.log(proxyObj.age)
  console.log('age2 end----')
})

console.log('----------');

proxyObj.name = 'aaa'
proxyObj.age = 40

