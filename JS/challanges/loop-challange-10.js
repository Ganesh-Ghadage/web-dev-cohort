function invertedMountain(n) {
    let pattern = "";
  for(let i = n; i >= 1; i--){
    pattern += `${'*'.repeat(i)}\n`
  }

  return pattern.trimEnd()
}

console.log(invertedMountain(4))

