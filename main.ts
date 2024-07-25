import { reactive, reactiveES5 } from './utils/reactive'
import { watchFn } from './utils/depend'

// example

/** 
 * 1. create reactive as Proxy(ES6)
 * 2. create reactiveES5 as Object.defineProperty(ES5)
*/
const foo = reactive({
  count: 0,
  bar: 'bar'
})

/** 
 * 1. The callback function will be executed the first time it is run
 * 2. When the object properties change, the callback function will be called directly
 * */ 
watchFn(() => {
  console.log('execute watchFn')
  console.log(foo.count)
})


setTimeout(() => {
  foo.count++
}, 3000)