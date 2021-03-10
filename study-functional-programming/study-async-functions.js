// blocking function -> synchronous funtions
function fun(numbers) {
    return numbers.reduce((s, u) => s + u, 0);
}

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// blocking
let sum = fun(numbers);
console.log("sum: " + sum);

// 1) Promise
// async
function gun(numbers) {
    return new Promise((resolve, reject) => {
        let sum = numbers.reduce((s, u) => s + u, 0);
        if (Math.random() < 0.5)
            resolve(sum);
        else
            reject("Something is wrong!");
    });
}

gun(numbers).then(acc => console.log(acc))
    .catch(reason => console.log(reason));


// es7 : async (syntactic sugar)
async function sun(numbers) {
    let sum = numbers.reduce((s, u) => s + u, 0);
    if (Math.random() < 0.5)
        return sum;
    else
        throw "Something is wrong!";
}

sun(numbers).then(acc => console.log(acc))
           .catch(reason => console.log(reason));

console.log("done!")
