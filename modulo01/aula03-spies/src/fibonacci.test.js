const assert = require('assert')
const Fibonacci = require('./fibonacci')
const { createSandbox } = require('sinon')
const sinon = createSandbox()


; (async () => {
  {
      const fibonacci = new Fibonacci()
      const spy = sinon.spy(fibonacci, fibonacci.exectute.name)
      // Numero de sequencias: 5
      // [0] input = 5, current = 0, next = 1 => 0
      // [1] input = 4, current = 1, next = 1 => 1
      // [2] input = 3, current = 1, next = 2 => 1
      // [3] input = 2, current = 2, next = 3 => 2
      // [4] input = 1, current = 3, next = 5 => 3
      // [5] input = 0, current = 5, next = 8 => 5

      for (const sequencia of fibonacci.exectute(5)) { }
      const expectedCallCount = 6
      assert.strictEqual(spy.callCount, expectedCallCount)
      const { args } = spy.getCall(2)
      const expectedCallArgs = [3, 1, 2]
      assert.deepStrictEqual(args, expectedCallArgs, "Os arrays não são iguais!")
    }

    {
      const fibonacci = new Fibonacci()
      const spy = sinon.spy(fibonacci, fibonacci.exectute.name)
      // Numero de sequencias: 3
      // [0] input = 5, current = 0, next = 1 => 0
      // [1] input = 4, current = 1, next = 1 => 1
      // [2] input = 3, current = 1, next = 2 => 1
      // [3] input = 0, current = 2, next = 3 => 2

      const results = [...fibonacci.exectute(5)]
      const expectedCallCount = 6
      assert.strictEqual(spy.callCount, expectedCallCount)
      const { args } = spy.getCall(2)
      const expectedCallArgs = [3, 1, 2]
      assert.deepStrictEqual(args, expectedCallArgs, "Os arrays não são iguais!")

      const expectedResults = [0, 1, 1, 2, 3]
      assert.deepStrictEqual(results, expectedResults, "Os arrays não são iguais!")
    }
  })()
