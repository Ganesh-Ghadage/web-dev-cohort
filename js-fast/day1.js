
// console.log(Math.floor(1 + Math.random() * 6))


function checkTruthyValue(value) {
      if(value){
            console.log("Truthy")
      }else {
            console.log("Falsy")
      }
}

// checkTruthyValue(1)
// checkTruthyValue(0)
// checkTruthyValue("ganesh")
// checkTruthyValue("")
// checkTruthyValue([])
// checkTruthyValue([1,2,3])
// checkTruthyValue({})



let userActivity = [
      {user: "Alice", activityCount: 405},
      {user: "Bob", activityCount: 72},
      {user: "Joe", activityCount: 13},
]

let maxActivityUser = userActivity.reduce((maxUser, curUser) => curUser.activityCount > maxUser.activityCount ? curUser : maxUser)
console.log(maxActivityUser)