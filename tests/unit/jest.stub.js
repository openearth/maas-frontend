/* eslint-disable */
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(true)
  })
)
