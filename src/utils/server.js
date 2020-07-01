
export async function getProduct(product_id, openserver){
  let get_product;
  let list_hotspots;

  if(openserver){
    var {getProduct, listHotspots} = await import(/* webpackChunkName: "openserver" */'@/api/openserver')
    get_product = getProduct
    list_hotspots = listHotspots
  }else{
    var {getProduct, listHotspots} = await import(/* webpackChunkName: "server" */'@/api/server')
    get_product = getProduct
    list_hotspots = listHotspots
  }

  var result = await get_product({product_id})

  var request = 0

  for (var index = 0; index < result.productInfo.scenes.length; index++) {
    let i = index
    list_hotspots({scene_id: result.productInfo.scenes[i].scene_id}).then(embeddings => {
      result.productInfo.scenes[i].embeddings = embeddings.sceneInfo.embeddings || []
      var rebuild = [{group:1, hotspots:[]},{group:2, hotspots:[]},{group:3, hotspots:[]}]
      result.productInfo.scenes[i].embeddings && result.productInfo.scenes[i].embeddings.forEach((item, i) => {
        item.hotspots && item.hotspots.forEach((item_, i) => {
          item_.target = item_.target && JSON.parse(item_.target) || {}
        });
        rebuild[item.group-1] = item
      });
      result.productInfo.scenes[i].embeddings = rebuild
    }).finally(()=>request++)
  }
  await new Promise((resolve, reject) => {
    let a = ()=>{
      if(request >= result.productInfo.scenes.length){resolve()}
      else{requestAnimationFrame(a)}
    }
    a()
  });
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
        hotspots[i].align = item__.align
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

  var {saveVR} = await import(/* webpackChunkName: "server" */'@/api/server')

  await saveVR({
    name: product.name,
    productId: product.product_id,
    description: product.description,
    cover: product.cover,
    scenes: scenes,
    tmpGroupId: product.tmp_group_id,
    music_url: product.music_url,
    exhibitor_id: product.exhibitor_id,
  })
}
