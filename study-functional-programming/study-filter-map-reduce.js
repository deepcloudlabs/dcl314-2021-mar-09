numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// odd -> squared -> sum
// Outer loop
let sum = 0;
for (let number of numbers) {
    if (number % 2 === 1)
        sum += number * number;
}
console.log(sum)

// Inner loop
// Functional Programming -> Filter/Map/Reduce (ES6)
sum =
numbers.filter( x => x%2 === 1)     // [ 1, 3, 5, 7, 9 ]
       .map( u => u*u )             // [ 1, 9, 25, 49, 81 ]
       .reduce( (s,u) => s+u , 0)   //  0 -> (0, 1) -> 1 -> (1, 9) ->
                                    // 10 -> (10,25) -> 35 -> (35,49) ->
                                    // 84 -> (84, 81) -> 165
console.log(sum)

// filter, map, reduce: generator functions
