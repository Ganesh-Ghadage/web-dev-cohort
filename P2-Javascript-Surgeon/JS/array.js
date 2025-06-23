let teaArr = ["Masala Tea", "Ginger Tea", "Lemon Tea", "Black Tea","Oolang Tea", "Herbal Tea"]

// add "Chamomile Tea" in array
teaArr.push("Chamomile Tea")

// remove"Oolang Tea" from array
teaArr = teaArr.filter((tea) => tea != "Oolang Tea")

// or
let index = teaArr.indexOf("Oolang Tea")
if (index > -1) {
    teaArr.splice(index , 1)
}

// filter teas that are cafinated 
const cafinatedTeas = teaArr.filter((tea) => tea != "Hearbal Tea")

//sort the teas in alphabetical order
teaArr.sort()

//use for loop to print each tea from array
for (let tea of teaArr) {
    console.log(tea)
}

//use for loo to count how many teas are cafinated
let countOfCafinatedTeas = 0;
for (let i = 0; i < teaArr.length; i++){
    if(teaArr[i] !== "Hearbal Tea") {
        countOfCafinatedTeas++;
    }
}
console.log(countOfCafinatedTeas)

//use for loop to create a new array with all teas in uppercase
const uppercaseTeas = []
for (let i = 0; i < teaArr.length; i++){
    uppercaseTeas.push(teaArr[i].toUpperCase())
}

console.log(uppercaseTeas)

//use for loop to find tea name with most character
let teaWithMostChar = ''

for (let i = 0; i < teaArr.length; i++){
    if(teaWithMostChar.length < teaArr[i].length){
        teaWithMostChar = teaArr[i]
    }
}

console.log(teaWithMostChar)

//use for to reverse order of tea in array
const reverseTeaArr = new Array(teaArr.length)

for (let i = 0; i < teaArr.length; i++){
    reverseTeaArr[reverseTeaArr.length - i -1] = teaArr[i]
}

console.log(reverseTeaArr)