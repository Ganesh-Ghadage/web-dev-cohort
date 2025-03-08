// Problem: Create an object representing a type of tea with properties for name, type, and caffeine content.

const tea = {
    name: "Lemon Tea",
    type: "Green",
    caffine: "low"
}

// Problem: Access and print the name and type properties of the tea object.
console.log(tea.name)
console.log(tea["type"])

//Problem: Add a new property origin to the tea object.
tea.origin = "Shimla"

//Problem: Change the caffeine level of the tea object to "Medium".
tea.caffine = "Medium"

//Problem: Remove the type property from the tea object
delete tea.type 

//Problem: Check if the tea object has a property origin.
console.log(Object.hasOwn(tea, 'origin'))
//or
console.log("origin" in tea)

//Problem: Use a for...in loop to print all properties of the tea object.
for (const key in tea) {
   console.log(key)
}

//Problem: Create a nested object representing different types of teas and their properties.
const teas = {
    blackTea: {
        name: "Black Tea",
        type: "Black",
        caffine: "High"
    },
    greenTea: {
        name: "Green Tea",
        type: "Green",
        caffine: "low"
    },
}

//Problem: Create a copy of the tea object.

const copyTea = tea // referance copy

const copyTea2 = new Object(tea) // referance copy

const copyTea3 = { ...tea } // shallow copy

// copyTea3.name = "Green Tea"

console.log(copyTea3)


//Problem: Add a custom method describe to the tea object that returns a description string.
tea.describeTea = function() {
    return 'This is a lemon tea'
}

console.log(tea.describeTea())

//Problem: Merge two objects representing different teas into one.
const blackTea = {
    name: "Black Tea",
    type: "Black",
    caffine: "High"
}

const greenTea = {
    name: "Green Tea",
    type: "Green",
    caffine: "low"
}

const newTeas = {blackTea , greenTea}


console.log(newTeas)