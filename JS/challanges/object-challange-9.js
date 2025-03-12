const obj = {
    name: "ganesh",
    age: 45,
    add: {
        area: 'shivaji nagar',
        gav: 'madha'
    }
}

const jsonObj = JSON.stringify(obj)
const newObj = JSON.parse(jsonObj)

newObj.add.gav = 'upalai'


console.log(obj)
console.log(newObj)
