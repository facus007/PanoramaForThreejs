export async function getProduct(){
  return new Promise(function(resolve, reject) {
    requestAnimationFrame(async function () {
      resolve( await (await fetch('./static/data.json')).json())
    });
  });
}
