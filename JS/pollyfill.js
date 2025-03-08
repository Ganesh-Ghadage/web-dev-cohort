if(!Array.prototype.myFilter){
    Array.prototype.myFilter = function(userFn) {
        let result = []

        for (let i = 0; i < this.length; i++) {
            if(userFn(this[i], i)){
                result.push(this[i])
            }
            
        }

        return result
    }
}

let arr = [1, 2, 3, 4, 5, 6]

let filterArr = arr.myFilter((e) => e % 2 === 0)

console.log(filterArr)