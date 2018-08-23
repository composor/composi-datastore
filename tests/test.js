import { Observer } from '../src/observer'
import { DataStore } from '../src/dataStore'
import * as utils from '../src/utils'



beforeEach(() => {
  document.body.innerHTML = ''
})

test('Utils: EMPTY_OBJECT', () => {
  expect(utils.EMPTY_OBJECT).toEqual({})
})

test('Utils: merge', () => {
  const obj1 = {
    name: 'Joe'
  }
  const obj2 = {
    job: 'mechanic'
  }
  const person = utils.merge(obj1, obj2)
  expect(obj1).toEqual({name: 'Joe'})
  expect(obj2).toEqual({ job: 'mechanic'})
  expect(person).toEqual({name: 'Joe', job: 'mechanic'})
})

test('Utils: isObject', () => {
  const obj1 = {}
  const obj2 = {name: 'Joe'}
  const str = 'a string'
  const num = 1
  const fn = () => {}
  const array = [1, 2, 3]
  expect(utils.isObject(obj1)).toEqual(true)
  expect(utils.isObject(obj2)).toEqual(true)
  expect(utils.isObject(/** @type{any}*/(str))).toEqual(false)
  expect(utils.isObject(/** @type{any}*/(num))).toEqual(false)
  expect(utils.isObject(fn)).toEqual(false)
  expect(utils.isObject(array)).toEqual(false)
})

test('Utils: Create a uuid of 36 characters', () => {
  const id = utils.uuid()
  expect(typeof id).toEqual('string')
  expect(id.length).toEqual(36)
})

let passedData = null
const observer = new Observer()

function callback(data) {
  passedData = data
}

let sentMessage = null

test('Observer setup', () => {
  expect(typeof observer).toEqual('object')
  expect(typeof observer.watch).toEqual('function')
  expect(typeof observer.dispatch).toEqual('function')
  expect(passedData).toEqual(null)
})

test('Observer watch setup', () => {
  observer.watch('test', callback)
  expect(typeof observer.events).toEqual('object')
  expect(Array.isArray(observer.events.test)).toEqual(true)
  // Should have one callback:
  expect(typeof observer.events.test[0]).toEqual('function')
  expect(passedData).toEqual(null)
})

test('Observer should dispatch event and data', () => {
  observer.dispatch('test', 'This is the test.')
  expect(passedData).toEqual('This is the test.')
})

test('Add another watcher to same event on observer', () => {
  observer.watch('test', (message) => {
    sentMessage = message
  })
  expect(sentMessage).toBeNull()
  expect(observer.events.test.length).toBe(2)
})

test('Second watcher to receive same dispatch as first', () => {
  observer.dispatch('test', 'A new test.')
  expect(passedData).toEqual('A new test.')
  expect(sentMessage).toEqual('A new test.')
})

const dataStore = new DataStore({
  state: {
    items: [1,2,3]
  }
})

test('dataStore should be an instance of DataStore', () => {
  expect(dataStore instanceof DataStore).toEqual(true)
})

test('dataStore.state.items should have 3 entries', () => {
  expect(dataStore.state.items.length).toEqual(3)
  expect(dataStore.state.items).toEqual([1,2,3])
})

test('dataStore.setState should update state', () => {
  dataStore.setState(prevState => {
    prevState.items.push(4)
    return prevState
  })
  expect(dataStore.state.items.length).toBe(4)
})

test('dataStore.observer should be instance of Observer', () => {
  expect(dataStore.observer instanceof Observer).toBe(true)
})

test('use dataStore to dispatch event and data to dataStore watcher', () => {
  dataStore.watch('update', (data) => {
    dataStore.setState(prevState => {
      prevState.items.push(data)
      return prevState
    })
  })
  dataStore.dispatch('update', 5)
  expect(dataStore.state.items.length).toBe(5)
})

test('dataStore setState without callback', () => {
  const dataStoreObj = new DataStore({
    state: {
      person: {name: 'Joe'}
    }
  })
  expect(dataStoreObj.state.person.name).toBe('Joe')
  dataStoreObj.setState({person: {name: 'Jane'}})
  expect(dataStoreObj.state.person.name).toBe('Jane')
})
