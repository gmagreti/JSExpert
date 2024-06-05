// Fibonacci: o proximo numero é a soma dos dois anteriores
// input: 3
// 0,1,1
// output: 5
// 0,1,1,2,3

class Fibonacci {
  * exectute(input, current = 0, next = 1) {
    // Processou todas as sequencias
    // e para!
    if (input === 0) {
      return 0
    }

    yield current
    yield* this.exectute(input - 1, next, current + next)
  }
}

module.exports = Fibonacci;