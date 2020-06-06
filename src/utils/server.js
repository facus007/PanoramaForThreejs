import {getProduct as getProduct_, listHotspots as listHotspots_, saveVR as saveVR_} from '@/api/server'
import {getProduct as getProduct_openserver, listHotspots as listHotspots_openserver} from '@/api/openserver'

export async function getProduct(product_id, openserver){
  let get_product = openserver ? getProduct_openserver : getProduct_
  let list_hotspots = openserver ? listHotspots_openserver : listHotspots_
  var result = await get_product({product_id})
  for (var i = 0; i < result.productInfo.scenes.length; i++) {
    let embeddings = await list_hotspots({scene_id: result.productInfo.scenes[i].scene_id})
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

export async function saveVR(product){
  var scenes=[]
  product.scenes.forEach((item, i) => {
    var embeddings = []
    item.embeddings && item.embeddings.forEach((item_, i) => {
      embeddings[i] = embeddings[i] || {}
      embeddings[i].group = item_.group
      var hotspots = []
      item_.hotspots && item_.hotspots.forEach((item__, i) => {
        hotspots[i] = hotspots[i] || {}
        hotspots[i].embedId = item__.embed_id
        hotspots[i].name = item__.name
        hotspots[i].transform = {position: item__.transform.position, rotation: item__.transform.rotation, scale: item__.transform.scale, affine_transform: item__.transform.affine_transform}
        hotspots[i].type = item__.type
        hotspots[i].style = item__.style
        hotspots[i].imgUrl = item__.img_url
        hotspots[i].label = item__.label
        hotspots[i].target = JSON.stringify(item__.target)
        hotspots[i].attribute = JSON.stringify(item__.attribute)
      });
      embeddings[i].hotspots = hotspots
    });
    scenes[i] = scenes[i] || {}
    scenes[i].sceneId = item.scene_id
    scenes[i].name = item.name
    scenes[i].cover = item.cover
    scenes[i].fov = item.fov
    scenes[i].startRotation = item.start_rotation
    scenes[i].embeddings = embeddings
    scenes[i].tmpId = item.tmp_id
  });
  await saveVR_({
    name: product.name,
    productId: product.product_id,
    description: product.description,
    cover: product.cover,
    scenes: scenes,
    tmpGroupId: product.tmp_group_id,
  })
}
