function myFunc (...args) {
      console.log(args)
}

myFunc('hello', 'myName')



let myArray = [ 1 , 2 , 3 , 4 , 5 ];

let newArray = [...myArray] 

// newArray will have all the elements of myArray
// i.e. newArray = [ 1 , 2 , 3 , 4 , 5 ];

console.log(newArray)