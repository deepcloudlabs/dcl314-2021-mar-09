x = 42;
x = []
x.push(4);
x.push(42);
x.push(23);
x.push(15);
x.push(16);
x.push(8);

console.log(x)

numbers = [4, 42, 23, 15, 16, 8]


// loops
numbers[10] = 100; // numbers is irregular array
console.log(numbers)
console.table(numbers)
console.log(numbers.length)

// 1) outer loop (does not work well with irregular arrays)
for (let i = 0; i < numbers.length; ++i) {
    console.log(`${i} -> ${numbers[i]}`);
}

// 2) outer loop : for-each-in  (works with irregular arrays)
for (let i in numbers) {
    console.log(`${i} -> ${numbers[i]}`);
}

// 3) outer loop : for-each-of  (does not work well with irregular arrays)
for (let number of numbers) {
    console.log(`${number}`);
}

// 4) inner loop : Array.forEach()
numbers.forEach((number, i) => console.log(`${i} -> ${number}`)) // functional programming
numbers.forEach(console.log)

let numericAscOrder = (x, y) => {
    if (x < y) return -1;
    if (x === y) return 0;
    return +1;
}

let numericDescOrder = (x, y) => {
    if (x < y) return +1;
    if (x === y) return 0;
    return -1;
}

numbers.sort((x, y) => x - y);
console.log(numbers);
numbers.sort((x, y) => y - x);
console.log(numbers);

names = ["jack", "kate", "james", "ben", "jin", "sun"]
names.sort()
console.log(names)
names.sort((n1,n2) => n2.localeCompare(n1))
console.log(names)
