// negative index in array

const array = [1,2,3,4,5,6,7,8,9,10]

const newArr = new Proxy(array, {
      get(target, prop){
            let index = Number(prop)
            if(index < 0){
                  return target[target.length + index]
            }
            return target[index]
      },
      set(target, prop, value){
            let index = Number(prop)
            if(index < 0){
                  target[target.length + index] = value
            } else {
                  target[index] = value
            }

            return true
      }
})

console.log(newArr[-5])

newArr[-1] = 22

console.log(newArr)
console.log(array)