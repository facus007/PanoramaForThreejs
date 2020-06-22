// source: list
// action: (item, index) => promise
// checkfunction: (item, index) => bool
export default function(source, action){
  let length = source.length
  let checkFlag = new Array(length)

  let c = () => {
    let result = 0
    for (var i = 0; i < length; i++) {
      if(!checkFlag[i]){ return }
      if(checkFlag[i] instanceof Error){result++}
    }
    return result
  }

  let p = new Promise((resolve, reject) => {
    let a = () => {
      let result = c()
      if(typeof result === 'number') {
        result === 0 ? resolve(checkFlag) : reject(checkFlag)
      } else {
        requestAnimationFrame(a)
      }
    }
    a()
  });

  for (var i = 0; i < length; i++) {
    let index = i
    action(source[index], index).then( r => checkFlag[index] = r || true ).catch( e => checkFlag[index] = e)
  }

  return p
}
