export async function getProduct(product_id) {
  var template = await (await fetch('/static/model.json')).json()
  return {
    name: 'test',
    description: 'test product',
    cover: '',
    published: false,
    create_time: '',
    update_time: '',
    scenes: [{
      scene_id: '-1',
      name: 'test scene',
      description: '',
      cover: '',
      fov: 60,
      start_rotation: [Math.PI/2, Math.PI/2],
      material_id: '-1',
      type: 1,
      template: template,
      pano_graphic_url1: '/static/test.png/right.jpg',
      pano_graphic_url2: '/static/test.png/back.jpg',
      pano_graphic_url3: '/static/test.png/left.jpg',
      pano_graphic_url4: '/static/test.png/front.jpg',
      pano_graphic_url5: '/static/test.png/top.jpg',
      pano_graphic_url6: '/static/test.png/bottom.jpg',
      embeddings:[{
        group: 1,
        hotspots: [{
          name: 'A6_3_1',
          label: '',
          embed_id: '-1',
          transform: {
            position: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
            affine_transform: [0, 0, 1, 1, 0, 0.5, 0.5],
          },
          type: 0,
          style: 1,
          img_url: '/static/test.png/front.jpg',
          label: 'label',
          target: {
            link: 'https://www.baidu.com'
          },
        },{
          name: 'A1_2_1',
          label: '',
          embed_id: '-1',
          transform: {
            position: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
            affine_transform: [0, 0, 1, 1, 0, 0.5, 0.5],
          },
          type: 0,
          style: 2,
          img_url: '/static/trailer.mp4',
          label: 'label',
          target: {
            link: 'https://www.baidu.com'
          },
        }],
      },{
        group: 2,
        hotspots: [{
          name: 'P30_1_1',
          label: '',
          embed_id: '-1',
          transform: {
            position: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
            affine_transform: [0, 0, 1, 1, 0, 0.5, 0.5],
          },
          type: 0,
          style: 1,
          img_url: '/static/test.png/front.jpg',
          label: 'label',
          target: {
            link: 'https://www.baidu.com'
          },
        },{
          name: 'P34_1_1',
          label: '',
          embed_id: '-1',
          transform: {
            position: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
            affine_transform: [0, 0, 1, 1, 0, 0.5, 0.5],
          },
          type: 0,
          style: 1,
          img_url: '/static/pot.png',
          label: 'label',
          target: {
            link: 'https://www.baidu.com'
          },
        },{
          name: 'P32_1_1',
          label: '',
          embed_id: '-1',
          transform: {
            position: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
            affine_transform: [0, 0, 1, 1, 0, 0.5, 0.5],
          },
          type: 0,
          style: 2,
          img_url: '/static/trailer.mp4',
          label: 'label',
          target: {
            link: 'https://www.baidu.com'
          },
        }],
      },{
        group: 3,
        hotspots: [{
          name: 'spot',
          embed_id: '-1',
          transform: {
            position: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
            affine_transform: [1, 0, 0, 0, 1, 0, 0, 0, 1],
          },
          type: 0,
          style: 2,
          img_url: '/static/test.png/right.jpg',
          label: 'label',
          target: {
            link: 'https://www.baidu.com'
          },
        }],
      },]
    }],
  }
}
