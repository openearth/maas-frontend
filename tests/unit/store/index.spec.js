import store from '@/store/index.js'

test('Initial state', () => {
  const initialState = {
    processInput: null,
    processes: [],
    schemas: null
  }
  expect(store.state).toEqual(initialState)
})

describe('loadOpenAPI', () => {
  test('updates state.schemas with schemas in payload', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          components: {
            schemas: { foo: 'bar' }
          }
        })
      })
    )
    await store.dispatch('loadOpenAPI', store)
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(store.state.schemas).toEqual({ foo: 'bar' })
  })
})

describe('loadProcesses', () => {
  test('updates state.processes with payload', async () => {
    const data = [{ id: 'foo' }, { id: 'bar' }]
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(data)
      })
    )
    await store.dispatch('loadProcesses', store)
    expect(global.fetch).toHaveBeenCalledTimes(3)
    expect(store.state.processes).toEqual(data)
  })
})

describe('loadProcessJobs', () => {
  test('updates state.processes with jobs', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ foo: 'bar' })
      })
    )
    store.state.processes = [{ id: 'foo' }, { id: 'bar' }]
    store.dispatch('loadProcessJobs', store)
    expect(global.fetch).toHaveBeenCalledTimes(2)
  })
})

describe('getProcessInputPerModel', () => {
  test('updates state.processes with jobs', () => {
    store.state.processes = [{ id: 'fm', inputs: { type: 'foo' } }, { id: 'hydromt', inputs: { type: 'bar' } }]
    store.state.schemas = { foo: 'foo-input', bar: 'bar-input' }
    store.dispatch('getProcessInputPerModel', (store, 'fm'))
    expect(store.state.processInput).toEqual('foo-input')
  })
})
