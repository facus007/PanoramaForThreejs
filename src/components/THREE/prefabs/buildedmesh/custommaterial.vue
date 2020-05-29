<template>
<span>
  <script ref="vertexShader" type="x-shader/x-vertex">
  uniform vec2 size;
  varying vec2 vUv;

  void main()	{
    vUv = uv.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  </script>
  <script ref="fragmentShader" type="x-shader/x-fragment">
  varying vec2 vUv;
  uniform sampler2D customMap;

  void main()	{
    gl_FragColor = texture2D( customMap, vUv.xy );
  }
  </script>
</span>
</template>
