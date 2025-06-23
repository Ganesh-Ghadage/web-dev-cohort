const teas = {
    name: "teas", 
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

const copyTea = {}

Object.assign(copyTea, teas) 

copyTea.name = 'copyTea'
copyTea.blackTea.name = 'copy black tea'

console.log(copyTea)
console.log(teas)

// Object.assign creates shallow copy