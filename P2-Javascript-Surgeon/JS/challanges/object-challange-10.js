function getNestedValue(obj, keyPath) {
    // Return the value from the nested object based on keyPath
    if(typeof obj != 'object') return
    const keys = keyPath.split('.')

    let newObj = obj;

    for (let key of keys) {
        if (newObj[key] === undefined){
            return "Key not found"
        }
    }

    // let result = obj
    // for(let i = 0; i < keys.length; i++){
    //     // console.log(result)
    //     if(typeof result === 'string') return result

    //     if(!result.hasOwnProperty(keys[i])) return "Key not fount"
      
    //     result = result[keys[i]]

    // }
  
    return result
}

console.log(getNestedValue({user: {address: {city: 'New York'}}}, 'user.address.city'))