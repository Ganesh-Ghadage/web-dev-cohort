function mergeObjects(obj1, obj2) {
    return {...obj1, ...obj2}
}

console.log(mergeObjects({name: "ganesh", age: 25}, {name: "ashwini", email: 'ash@g.comm'}))

