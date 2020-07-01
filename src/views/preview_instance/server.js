export async function getProduct(){
  return new Promise(function(resolve, reject) {
    setTimeout(async function () {
      resolve( await (await fetch('./static/data.json')).json())
    }, 10);
  });
}
