// first class function

function applyOperations (a, b, operations) {
    console.log(operations)
    return operations(a, b)
}

const result = applyOperations(15, 3, function(x, y){return x+y })

console.log(result)