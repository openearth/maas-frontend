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
  test('updates state.schemas with schemas in payload', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          components: {
            schemas: { foo: 'bar' }
          }
        })
      })
    )
    store.dispatch('loadOpenAPI', store)
    expect(global.fetch).toHaveBeenCalledTimes(1)
    console.log(store.state)
    expect(store.state.schemas).toEqual({ foo: 'bar' })
  })
})

describe('loadProcesses', () => {
  test('updates state.schemas with schemas in payload', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          foo: 'bar'
        })
      })
    )
    store.dispatch('loadProcesses', store)
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(store.state.schemas).toEqual({ foo: 'bar' })
  })
})
