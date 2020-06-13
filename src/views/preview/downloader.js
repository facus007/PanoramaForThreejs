export async function download(product, scene_id){
  var loadinglist = []
  let item = product.scenes.filter((item)=> item.scene_id === scene_id)[0] || product.scenes[0]
}
