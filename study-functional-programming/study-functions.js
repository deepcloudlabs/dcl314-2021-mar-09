function fun(x, y, z) {
    return x * y + z;
}

// 1) arguments

function gun(x, y, z) {
    if (arguments.length != 3)
        throw "illegal arguments: must provide exactly 3 parameters!"
    return x * y + z;
}

// 2) default value
function sun(x, y, z) {
    x = x || 1;
    y = y || 2;
    z = z || 3;
    return x * y + z;
}

// es6+
function run(x = 1, y = 2, z=3) {
    return x * y + z;
}

console.log(run()); // 5, x=1, y=2, z=3
console.log(run(3)); // 9, y=2, z=3
console.log(run(3,2)); // 9, z=3
console.log(run(3,2,1)); // 7
console.log(run(3,2,1,0)); // 7


function tun(o) { // object -> single parameter
    return o.x * o.y + o.z;
}
run(3,2,1)

tun({
   z: 3,
   y: 2,
   x: 1
})
