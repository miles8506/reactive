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
  name: 'miles'
}

const proxyObj = new Proxy(obj, {
  get(target, key, receive) {
    return Reflect.get(target, key, receive)
  },
  set(target, key, newValue, receive) {
    const val = Reflect.set(target, key, newValue, receive)
    const depend = getDepend(target, key as string)
    depend.notify()
    return val
  }
})



proxyObj.name = 'aaa'
proxyObj.name = 'bbb'
proxyObj.name = 'ccc'
