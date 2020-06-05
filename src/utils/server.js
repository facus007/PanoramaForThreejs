import {getProduct as getProduct_, listHotspots} from '@/api/server'

export async function getProduct(product_id){
  var result = await getProduct_({product_id})
  for (var i = 0; i < result.productInfo.scenes.length; i++) {
    let embeddings = await listHotspots({scene_id: result.productInfo.scenes[i].scene_id})
    result.productInfo.scenes[i].embeddings = embeddings.sceneInfo.embeddings || []
    var rebuild = [{group:1, hotspots:[]},{group:2, hotspots:[]},{group:3, hotspots:[]}]
    result.productInfo.scenes[i].embeddings && result.productInfo.scenes[i].embeddings.forEach((item, i) => {
      item.hotspots && item.hotspots.forEach((item_, i) => {
        item_.target = item_.target && JSON.parse(item_.target) || {}
        item_.attribute = item_.attribute && JSON.parse(item_.attribute) || {}
      });
      rebuild[item.group-1] = item
    });
    result.productInfo.scenes[i].embeddings = rebuild
  }
  return result.productInfo
}
