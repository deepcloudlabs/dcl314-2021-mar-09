function fun(numbers) {
    let odds = [];
    for (let number of numbers) {
        if (number % 2 === 1)
            odds.push(number);
    }
    return odds;
}

function* filter(numbers, ff) {
    for (let number of numbers) {
        console.log("filtering numbers: "+number);
        if (ff(number))
            yield number;
    }
}

function* map(numbers, mf){
    for (let number of numbers) {
        console.log("mapping numbers: "+number);
        yield mf(number);
    }
}

function* reduce(numbers,initValue, rf){
    let acc = initValue;
    for (let number of numbers) {
        console.log("reducing numbers: "+number);
        acc = rf(acc,number);
    }
    yield acc;
}

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let x of map(filter(numbers, x => x%2 === 1), u => u*u )){
    console.log("odd and squared value: "+x);
}

sum = reduce(
    map(filter(numbers, x => x%2 === 1), u => u*u ),
    0,
    (s,u) => s + u
).next();

console.log(sum)
