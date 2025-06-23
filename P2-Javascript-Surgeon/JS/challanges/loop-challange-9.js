function shinyDiamondRug(n) {
    let str = "*"
    let pattern = ""
    for (let i = 1; i <= n; i++){
        pattern += `${" ".repeat(n - i) + str.repeat((i * 2) - 1)}\n`
    }
    for (let i = n - 1 ; i > 0; i--){
        pattern += `${" ".repeat(n - i) + str.repeat((i * 2) - 1)}\n`
    }

    return pattern.trimEnd()
  }

console.log(shinyDiamondRug(3))