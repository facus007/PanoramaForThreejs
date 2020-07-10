<template>
  <div style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; color:white">
    <img style="position:relative; width: 100%; height: 100%; object-fit: contain; broder: 0;" :src='item.url'/>
  </div>
</template>

<script>
export default {
  props:['item'],
  mounted(){}
}
</script>
